import axios from 'axios'
import { API_URL_USER_DB, API_URL_AI } from './config'

const apiClientUserDB = axios.create({
  baseURL: API_URL_USER_DB,
  'accept': 'application/json',
})

const apiClientAI = axios.create({
  baseURL: API_URL_AI,
  'accept': 'application/json',
})

const user_db_api = {
  query_to_user_db: (test_id, query) => {
    return apiClientUserDB.get(`/sql?record_id=${test_id}&query=${query}`);
  },
  create_er_diagram: (test_id) => {
    return apiClientUserDB.get(`/er-diagram?record_id=${test_id}`);
  },
  get_schema: (test_id) => {
    return apiClientUserDB.get(`/schema?record_id=${test_id}`);
  },
};

const ai_api = {
  create_question: (schema, complexity) => {
    return apiClientAI.get(`/create_question?schema=${schema}&complexity=${complexity}`);
  }
}

export { user_db_api, ai_api };