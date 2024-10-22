import { createStore } from 'vuex';

const store = createStore({
  state: {
    userId: null,
    question1Answer: '',
    question2Answer: '',
    question3Answer: '',
    question4Answer: '',
    question1StartTime: '',
    question2StartTime: '',
    question3StartTime: '',
    question4StartTime: '',
    question1EndTime: '',
    question2EndTime: '',
    question3EndTime: '',
    question4EndTime: '',
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setQuestion1Answer(state, answer) {
      state.question1Answer = answer;
    },
    setQuestion2Answer(state, answer) {
      state.question2Answer = answer;
    },
    setQuestion3Answer(state, answer) {
      state.question3Answer = answer;
    },
    setQuestion4Answer(state, answer) {
      state.question4Answer = answer;
    },
    setQuestion1StartTime(state, time) {
      state.question1StartTime = time;
    },
    setQuestion2StartTime(state, time) {
      state.question2StartTime = time;
    },
    setQuestion3StartTime(state, time) {
      state.question3StartTime = time;
    },
    setQuestion4StartTime(state, time) {
      state.question4StartTime = time;
    },
    setQuestion1EndTime(state, time) {
      state.question1EndTime = time;
    },
    setQuestion2EndTime(state, time) {
      state.question2EndTime = time;
    },
    setQuestion3EndTime(state, time) {
      state.question3EndTime = time;
    },
    setQuestion4EndTime(state, time) {
      state.question4EndTime = time;
    },
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getQuestionTimes(state) {
        return {
            question1: { start: state.question1StartTime, end: state.question1EndTime },
            question2: { start: state.question2StartTime, end: state.question2EndTime },
            question3: { start: state.question3StartTime, end: state.question3EndTime },
            question4: { start: state.question4StartTime, end: state.question4EndTime },
        };
    },
  },
});

export default store;
