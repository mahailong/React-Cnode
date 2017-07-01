
import { get, post } from '../utils/request';


export async function fetchTopics(opts) {
  return get('/topics',opts);
}

export async function fetchUserInfo(opts) {
  return get(`/user/${opts}`);
}

export async function fetchUserCollect(name) {
  return get(`/topic_collect/${name}`);
}

export async function fetchTopicDetail(opts) {
  return get(`/topic/${opts.id}`,opts);
}

export async function loginByAccesstoken (opts) {
  return post(`/accesstoken`,opts);
}

export async function postTopics(opts) {
  return post('/topics',opts);
}

export async function updateTopics(opts) {
  return post('/topics/update',opts);
}

export async function postCollect (opts) {
  return post(`/topic_collect/collect`,opts);
}

export async function deleteCollect (opts) {
  return post(`/topic_collect/de_collect`,opts);
}

export async function postreplyups (opts) {
  return post(`/reply/${opts.id}/ups`,opts);
}

export async function postReply (opts) {
  return post(`/topic/${opts.topic_id}/replies `,opts);
}

export async function getMessages(opts) {
  return get('/messages',opts);
}

export async function getMessageCount(opts) {
  return get(`/messages/count`,opts);
}

export async function postMessageMark_all (opts) {
  return post(`/message/mark_all`,opts);
}

export async function postMessageMark_one (opts) {
  return post(`/message/mark_one/${opts.msg_id}`,opts);
}
