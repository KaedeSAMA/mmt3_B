import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import loginMock from './mock/login'
export function setupProdMockServer() {
  createProdMockServer([...loginMock])
}
