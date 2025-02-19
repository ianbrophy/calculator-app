const app = Vue.createApp({
  data() {
    return {
      currentOp: [],
      numDisplay: "0", //Intentionally set as a string for the display 
      numTemp: 0,
      nums: [],
      operation: "",
    };
  },
  methods: {
    //Append the number that is pressed as a string to the currently displayed number
    buttonOne() {
      this.appendNum("1");
    },
    buttonTwo() {
      this.appendNum("2");
    },
    buttonThree() {
      this.appendNum("3");
    },
    buttonFour() {
      this.appendNum("4");
    },
    buttonFive() {
      this.appendNum("5");
    },
    buttonSix() {
      this.appendNum("6");
    },
    buttonSeven() {
      this.appendNum("7");
    },
    buttonEight() {
      this.appendNum("8");
    },
    buttonNine() {
      this.appendNum("9");
    },
    buttonZero() {
      this.appendNum("0");
    },

    //Perform the string append. If the display is zero, swap it with the pressed number.
    appendNum(num) {
      if (this.numDisplay === "0") {
        this.numDisplay = num;
      } else {
        this.numDisplay += num;
      }
    },

    //Send the desired operation to a function that will convert the displayed string to a number and perform the operation
    buttonAdd() {
      this.prepareForOperation("add",'+');
    },
    buttonSub() {
      this.prepareForOperation("sub",'-');
    },
    buttonDiv() {
      this.prepareForOperation("div",'/');
    },
    buttonMult() {
      this.prepareForOperation("mult",'*');
    },

    //If the displayed number is not 0, convert it and store it in the array
    prepareForOperation(operation,symbol) {
      //Clear the operation display for a new set of operations.
      if (this.currentOp.indexOf("=") !== -1){
        this.currentOp = [];       
      }
      if (this.numDisplay !== "0") {
        // Convert current display string to a number
        this.nums.push(Number(this.numDisplay));
        this.currentOp.push(Number(this.numDisplay));
        this.currentOp.push(symbol);

        //Reset display for the next input number
        this.numDisplay = "0";
      }
      this.operation = operation;
    },

    buttonEquals() {
      if (this.numDisplay !== "0") {
        //Store the last entered number
        this.nums.push(Number(this.numDisplay));
      }
      //Do nothing if no numbers are in the array.
      if (this.nums.length === 0) {
        return;
      }

      //Display result and operations array. Reset the display, array, and current operation.
      this.currentOp.push(Number(this.numDisplay));   
      this.numDisplay = this.calculateResult();
      this.currentOp.push('=');
      this.currentOp.push(Number(this.numDisplay));      
      this.nums = [];
      this.operation = "";
      this.numDisplay = "0";
    },

    //Clear the key values.
    buttonClear() {
      this.nums = [];
      this.numDisplay = '0';
      this.operation = "";
      this.currentOp= [];
    },

    //Interate through the nums array and perform the specified operation to get the result.
    calculateResult() {
      let result = this.nums[0];
      for (let i = 1; i < this.nums.length; i++) {
        if (this.operation === "add") {
          result += this.nums[i];
        } else if (this.operation === "sub") {
          result -= this.nums[i];
        } else if (this.operation === "mult") {
          result *= this.nums[i];
        } else if (this.operation === "div") {
          //Display an error when trying to divide by zero. This could be changed to set the value to 0 instead.
          if (this.nums[i] === 0) {
            return "Error: Div by 0";
            //Alternatively set result to 0 without displaying an error
            //return 0;
          } else {
            result /= this.nums[i];
          }
        }
      }
      return result;
    },
  },
});
app.mount("#calculator");
