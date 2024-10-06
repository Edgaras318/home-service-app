import * as categoriesEndpoints from "./categories-endpoints"
import * as businessesEndpoints from "./businesses-endpoints"
import * as authEndpoints from "./auth-endpoints"

export const ApiService = {
    ...categoriesEndpoints,
    ...businessesEndpoints,
    ...authEndpoints
}
