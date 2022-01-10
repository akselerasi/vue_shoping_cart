import { itemsReceived, searchItemsReceived } from "../slices/deal.js";

const baseDealUrl = '/bd/deals';

const getAllDeals = (params={}, lastPage=1, limit=5) => {
    return {
        method: 'GET',
        url: `${baseDealUrl}/?page=${lastPage}&limit=${limit}`,
        onSuccess: itemsReceived.type
    }
}

const searchAllDeals = (params={}, lastPage=1, limit=5) => {
    console.log(params);
    return {
        method: 'GET',
        url: `${baseDealUrl}/?page=${lastPage}&limit=${limit}&s=${params.s}`,
        onSuccess: searchItemsReceived.type
    }
}

export {getAllDeals, searchAllDeals};