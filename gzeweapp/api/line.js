
import { objToParams } from '../utils/util';
import { getUrl } from './const';
import { cloudCall } from './request';

export async function lineList () {
  return cloudCall({
    path: getUrl(`line/list`),
    method: 'GET',
  });
}


export async function lineData (lineId) {
  const params = objToParams({ lineId });
  return cloudCall({
    path: getUrl(`line/data?${params}`),
    method: 'GET',
  });
}

export async function lineTimeList (lineCode, stationId) {
  const params = objToParams({ lineCode, stationId });
  return cloudCall({
    path: getUrl(`line/time-list?${params}`),
    method: 'GET',
  });
}