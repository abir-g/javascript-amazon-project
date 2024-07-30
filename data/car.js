class Car {
  #brand; 
  #model;
  speed;
  isTrunkOpen;


  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.speed = 0;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed},
      Trunk is : ${this.isTrunkOpen}`);
  }

  go(){
    if (this.speed < 200 && !this.isTrunkOpen){
      this.speed += 5;
    }
  }

  brake() {
    if (this.speed > 0) {
      this.speed -= 5;
    }
  }

  openTrunk() {
    if(this.speed > 0){
      this.isTrunkOpen = false;
      return
    }
    this.isTrunkOpen = true;
  }

  closeTrunk(){
    this.isTrunkOpen = false;
  }


}

const toyota = new Car({brand: 'Toyota', model: 'Corolla'});
const tesla = new Car({brand: 'Tesla', model: 'Model 3'});

class Racecar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
    this.isTrunkOpen = false;
  }

  go(){
    const newSpeed = this.speed += this.acceleration;
    if(newSpeed >300){
      return;
    }
    this.speed = newSpeed;
  }

  openTrunk () {
    return;
  }

  closeTrunk() {
    return;
  }
}

const mclaren = new Racecar({
  brand: 'McLaren',
  model : 'F1',
  acceleration: 20
})

mclaren.go()
mclaren.displayInfo();