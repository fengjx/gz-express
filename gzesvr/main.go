package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.Default()
	engine.Any("/openapi/line/list", list)
	engine.Any("openapi/line//data", data)
	srv := &http.Server{
		Addr:    ":8000",
		Handler: engine,
	}
	go func() {
		log.Printf("http server listen[%s]", srv.Addr)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("listen err: %s\n", err)
		}
	}()

	// 等待中断信号以优雅地关闭服务器（设置 5 秒的超时时间）
	quit := make(chan os.Signal)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown Server ...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}

func list(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	bytes, err := os.ReadFile("./data/list.json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]any{
			"code": 500,
			"msg":  err.Error(),
		})
		return
	}
	c.String(http.StatusOK, string(bytes))
}

func data(c *gin.Context) {
	lineID := c.Query("lineId")
	c.Header("Content-Type", "application/json")
	bytes, err := os.ReadFile(fmt.Sprintf("./data/%s.json", lineID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]any{
			"code": 500,
			"msg":  err.Error(),
		})
		return
	}
	c.String(http.StatusOK, string(bytes))
}
