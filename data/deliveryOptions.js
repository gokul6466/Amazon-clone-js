import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
    {
        id: "1",
        deliveryDays: 7,
        price: 0
    },
    {
        id: "2",
        deliveryDays: 3,
        price: 100
    },
    {
        id: "3",
        deliveryDays: 1,
        price: 150
    },

]

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((options) => {
        if (options.id === deliveryOptionId)
            deliveryOption = options;
    });
    return deliveryOption || deliveryOptions[0];


}

// function isWeekend(date) {
//     const dayOfWeek = date.format('dddd');
//     return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
// }

export function calculateDeliveryDate(deliveryOption) {
    // let remainingDays = deliveryOption.deliveryDays;

    const today = dayjs();
    let deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
    )
    // let deliveryDate = dayjs();
    // while (remainingDays > 0) {
    //     deliveryDate = deliveryDate.add(1, 'days')
    //     if (!isWeekend(deliveryDate)) {
    //         remainingDays--;
    //     }
    // }
       
    

    const deliveryDateString = deliveryDate.format('dddd, MMMM D');

   
    return deliveryDateString;
    
}

