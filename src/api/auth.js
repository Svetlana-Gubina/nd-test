import { ref, computed } from 'vue';
import axios from 'axios';

const basePath = 'https://dist.nd.ru/';
const AUTH_KEY = 'user';
const AUTH_TOKEN = '';

export const api = axios.create({
  baseURL: basePath,
});

export const authHeader = () => {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
};

export const useApi = (endpoint) => {
  const loading = ref(false);
  const data = ref();
  const error = ref();

  const errorMessage = computed(() => {
    if (error.value) {
      return error.value.message;
    }
  });

  const errorFields = computed(() => {
    if (error.value && Array.isArray(error.value.message)) {
      return error.value.message.reduce((acc, msg) => {
        let [field] = msg.split(' ');

        if (!acc[field]) {
          acc[field] = [];
        }

        acc[field].push(msg);

        return acc;
      }, {});
    }
  });

  const headers = authHeader();

  const get = () => {
    loading.value = true;
    error.value = undefined;
    return api
      .get(endpoint, headers)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;
        throw e;
      })
      .finally(() => (loading.value = false));
  };

  const post = (payload) => {
    loading.value = true;
    error.value = undefined;
    return api
      .post(endpoint, payload, headers)
      .then((res) => (data.value = res.data))
      .catch((e) => {
        error.value = e;
        throw e;
      })
      .finally(() => (loading.value = false));
  };

  return {
    loading,
    data,
    error,
    errorMessage,
    errorFields,
    get,
    post,
  };
};

export const useAuth = () => {
  const setUser = (payload) => {
    window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN]);
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    //   return Promise.resolve()
  };

  return {
    setUser,
    logout,
  };
};
