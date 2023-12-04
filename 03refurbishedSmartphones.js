class RefurbishedSmartphones{
    constructor(retailer){
        this.retailer = retailer
        this.availableSmartphones = []
        this.soldSmartphones = []
        this.revenue = 0
        this.price = 0
 
    }
 
 
    addSmartphone (model, storage, price, condition) {
        if(model == "" || storage < 0 || price < 0 || condition == ""){
           throw new Error("Invalid smartphone!")
        }
 
        const newPhone = {
            model,
            storage,
            price,
            condition
        }
 
    
        this.availableSmartphones.push(newPhone)
       return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(2)}$`
 
    }
 
    sellSmartphone (model, desiredStorage){
        let phone = this.availableSmartphones.find(p => p.model === model);
 
        if (!phone) {
          throw new Error(`${model} was not found!`);
    } else{
 
        if(phone.storage > desiredStorage){
            return
        } 
    
        let difference = desiredStorage - phone.storage
 
        if(difference == 0){
            phone.price = phone.price
        }else if(difference > 0 && difference <= 128){
            phone.price -= phone.price * 0.1
    
        } else{
            phone.price -= phone.price * 0.2
        }
    
 
        const soldPhone = {
            model : phone.model,
            storage : phone.storage, 
            price : phone.price
            
        }
 
        const index = this.availableSmartphones.indexOf(phone)
        this.availableSmartphones.splice(index, 1)
        this.soldSmartphones.push(soldPhone)
 
        this.revenue += soldPhone.price
        return `${model} was sold for ${soldPhone.price.toFixed(2)}$`
 
    }
 
   
 
}
 
 
upgradePhones(){
 
    if(this.availableSmartphones.length <=0){
        throw new Error("There are no available smartphones!")
    }
 
    let str = "Upgraded Smartphones:"
    this.availableSmartphones.forEach(phone =>{
        phone.storage = phone.storage * 2
        let addStr = `\n${phone.model} / ${phone.storage} GB / ${phone.condition} condition / ${phone.price.toFixed(2)}$`
      addStr.trim()
      str += addStr
    })
 
    return str
 
}
 
salesJournal(criteria){
 
 if(criteria === "storage"){
       this.soldSmartphones.sort((a,b) => b.storage - a.storage)
    }else if(criteria === "model"){
        this.soldSmartphones.sort((a,b) => a.model.localeCompare(b.model))
    } else{
        throw new Error("Invalid criteria!")
 
    }
 
    let finalStr = ''
    let str1 = `${this.retailer} has a total income of ${this.revenue.toFixed(2)}$`
    let str2 = `\n${this.soldSmartphones.length} smartphones sold:`
    let str3 = ''
    
    this.soldSmartphones.forEach(phone => {
        let phoneStr = `\n${phone.model} / ${phone.storage} GB / ${phone.price.toFixed(2)}$`
        str3 += phoneStr
        str3.trim()
    })
 
    finalStr = str1 + str2 + str3
    return finalStr
 
 
}
 
 
}

let retailer = new RefurbishedSmartphones('SecondLife Devices');
retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
retailer.sellSmartphone('Samsung S20 Ultra', 256);
retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256);
console.log(retailer.salesJournal('model'));





