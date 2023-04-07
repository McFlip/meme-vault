// require("ts-node").register({ transpileOnly: true })
/**
 * @description This module is run once at the start of the test run before any test
 * @link https://jestjs.io/docs/configuration#globalsetup-string
 */

import jest from "jest"
import resetDB from "~/db/resetDB"

/**
 * @description reset the database to fixture
 */
const dbSetup = async (
  globalConfig: jest.Config,
  projectConfig: jest.Config
) => {
  await resetDB()
}

export default dbSetup
