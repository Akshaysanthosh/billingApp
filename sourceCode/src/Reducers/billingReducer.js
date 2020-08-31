
const initialState = {
    isBillingData:false,
    isAdditionalItem: false,
    billingData:{}
};

export const billingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'billingDetails':
            return {
                ...state,
                isBillingData: true,
                billingData: action.payload
            };
        case 'AddBillingItem':
            return {
                ...state,
                isAdditionalItem: true,
                billingData:  [...state.billingData,action.payload]
            };
        default:
            return state;
    }
};
