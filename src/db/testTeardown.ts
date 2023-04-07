// require("ts-node").register({ transpileOnly: true })
/**
 * @description This module is run once at the end of the test run
 * @link https://jestjs.io/docs/configuration#globalteardown-string
 */

import jest from "jest"
import resetDB from "~/db/resetDB"

/**
 * @description reset the database to fixture
 */
const dbTeardown = async (
  globalConfig: jest.Config,
  projectConfig: jest.Config
) => {
  await resetDB()
}

export default dbTeardown
