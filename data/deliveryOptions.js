import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3, 
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];


export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;

		deliveryOptions.forEach((option) => {
			if (option.id === deliveryOptionId){
				deliveryOption = option
			}
		});

  return deliveryOption || deliveryOptions[0];
}



/**
 * Calculates the delivery date for a specific delivery option.
 *
 * @function calculateDeliveryDate
 * @param {Object} deliveryOption - The delivery option object.
 * @param {number} deliveryOption.deliveryDays - The number of days for delivery.
 * @returns {string} A formatted date string representing the delivery date.
 *
 * @description
 * This function takes a single delivery option, calculates the 
 * delivery date based on the current date and the specified delivery days,
 * and returns the result as a formatted string (e.g., "Monday, July 10").
 * 
 * @requires dayjs - A library for date manipulation and formatting.
 *
 * @example
 * const option = { deliveryDays: 3 };
 * const date = calculateDeliveryDate(option);
 * console.log(date); // e.g., 'Wednesday, July 12'
 */
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
			const deliveryDate = today.add(
				deliveryOption.deliveryDays,
				'days'
			);
			const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
  };
