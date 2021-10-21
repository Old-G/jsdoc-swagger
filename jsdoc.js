/**
 * Return a string of bar
 *
 * @param {string} bar - A string of bar
 * @returns {string} the string bar
 */
function foo(bar) {
  return bar
}

foo()

/**
 * Return object of a car
 *
 * @param {string} mark - the mark of a car
 * @param {string} model - tha model of a car
 * @param {number} year - the year of a car
 * @param {boolean} sale - sale or not
 * @returns {object} car details
 */
function oneCar(mark, model, year, sale) {
  mark.toLowerCase()

  return {
    mark,
    model,
    year,
    sale,
  }
}

oneCar()

/**
 * @param {string} mark - the mark of a car
 * @param {string} model - tha model of a car
 * @param {number} year - the year of a car
 * @param {boolean} sale - sale or not
 */
class Car {
  constructor(mark, model, year, sale) {
    this.mark = mark
    this.model = model
    this.year = year
    this.sale = sale
  }
}

/**
 * A Car
 *
 * @param {Car} car - one car class
 */
function returnCar(car) {
  const item = new Car('Lexus', 'Ls 500h', 2021, true)
}
