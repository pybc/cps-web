import axios from "axios";
import config from "../../config";
// initial state
const state = () => ({
  eventDetail: null,
  eventList: null,
  myEventList: null,
  registerStatus: null,
});

// getters
const getters = {
  getEventDetail(state) {
    return state.eventDetail;
  },
  getEventList(state) {
    return state.eventList;
  },
  getMyEventList(state) {
    return state.myEventList;
  },
};

// actions action with data such as call api
const actions = {
  async getAllEvent({ commit }) {
    const eventList = await axios.get(`${config.api.baseUrl}/event`);
    commit("setEventList", eventList.data);
  },
  async getMyEventList({ commit }, uid) {
    const myEventList = await axios.get(
      `${config.api.baseUrl}/event/list/${uid}`
    );
    commit("setMyEventList", myEventList.data.data);
  },
  async fetchEventDetail({ commit }, _id) {
    const response = await axios.get(`${config.api.baseUrl}/event/${_id}`);
    commit("setEventDetail", response.data);
  },
  async register({ commit }, payload) {
    const registerStatus = await axios.post(
      `${config.api.baseUrl}/event/register`,
      payload
    );
    commit("setRegisterStatus", registerStatus);
    return registerStatus;
  },
};

// mutations
const mutations = {
  setEventList(state, eventList) {
    state.eventList = eventList;
  },
  setMyEventList(state, myEventList) {
    state.myEventList = myEventList;
  },
  setEventDetail(state, event) {
    state.eventDetail = event;
  },
  setRegisterStatus(state, registerStatus) {
    state.registerStatus = registerStatus;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
