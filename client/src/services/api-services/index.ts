import * as categoriesEndpoints from "./categories-endpoints"
import * as businessesEndpoints from "./businesses-endpoints"

export const ApiService = {
    ...categoriesEndpoints,
    ...businessesEndpoints
}
