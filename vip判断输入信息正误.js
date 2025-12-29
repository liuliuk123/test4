window.addEventListener("load",function(){
    const submitEle = document.querySelector(".addList2 input");
    const allInput = document.querySelectorAll(".addList");
    const tableEle = document.querySelector(".vipMy tbody")
    const userInput  = allInput[0].getElementsByTagName("input")[0];
    const addressInput = allInput[1].getElementsByTagName("input")[0];
    const emailCodeInput  = allInput[2].getElementsByTagName("input")[0];
    const idCardInput = allInput[3].getElementsByTagName("input")[0];
    const PhoneInput = allInput[4].getElementsByTagName("input");
    const normalPhoneInput = PhoneInput[0];
    const fixedPhoneInput = PhoneInput[1];
    const selectAll = allInput[5].querySelectorAll("select");
    submitEle.addEventListener("click",function(){
        let userInputContent = "";
        let addressInputContent = ""
        let emailCodeInputContent = ""
        let idCardInputContent = ""
        let phoneContent = ""
        let values = new Array(6);
        let tempAll = document.querySelectorAll("#error");
        for(i of tempAll){
            i.innerText=""
        }
        if(normalPhoneInput.value) {
            if(normalPhoneInput.value.match(/\d{11,12}/)){
                values[3]=normalPhoneInput.value
            } else {
                let temp = allInput[4].querySelector("#error")
                if(temp){
                    temp.innerText="普通手机号码错误"
                } else {
                    allInput[4].childNodes[4].remove()
                    allInput[4].childNodes[4].remove()
                    console.log(allInput[4].childNodes)
                    const pEle = document.createElement("span");
                    pEle.innerText="普通手机号码错误"
                    pEle.id="error"
                    allInput[4].appendChild(pEle)
                }
            }
        } else if(fixedPhoneInput.value) {
            if(fixedPhoneInput.value.match(/\d{7,8}/)){
                values[3]=fixedPhoneInput.value
            } else {
                let temp = allInput[4].querySelector("#error")
                if(temp){
                    temp.innerText="固定手机号码错误"
                } else {
                    allInput[4].childNodes[4].remove()
                    allInput[4].childNodes[3].remove()
                    const spanEle = document.createElement("span");
                    spanEle.innerText="固定手机号码错误"
                    spanEle.id="error"
                    allInput[4].appendChild(spanEle)
                }
            }
        }

        if(userInput.value.match(/[\w,\d]{3,7}/)){
            values[0]=userInput.value;
            values[2]=userInput.value;
        } else {
            let temp = allInput[0].querySelector("#error")
            if(temp){
                temp.innerText="用户名请输入数字或者字母,3位到7位"
            } else {
                const spanEle = document.createElement("span");
                spanEle.innerText="用户名请输入数字或者字母,3位到7位"
                spanEle.id="error"
                allInput[0].appendChild(spanEle)
            } 
        }

        if(addressInput.value.match(/[\u4E00-\u9FA5]+/)){
            values[5]=addressInput.value
        } else {
            let temp = allInput[1].querySelector("#error");
            if(temp){
                temp.innerText="详细地址请输入中文"
            } else {
                const spanEle = document.createElement("span");
                spanEle.innerText="详细地址请输入中文"
                spanEle.id="error"
                allInput[1].appendChild(spanEle)
            }
        }

        if(emailCodeInput.value.match(/\d{6}/)){
            values[1]=emailCodeInput.value
        } else {
            let temp = allInput[2].querySelector("#error")
            if(temp){
                temp.innerText="编码请输入6位数字"
            } else {
                const spanEle = document.createElement("span");
                spanEle.innerText="编码请输入6位数字"
                spanEle.id="error"
                allInput[2].appendChild(spanEle)
            }
        }

        if(idCardInput.value.match(/\d{17}(\d|X)/)){
            values[4]=idCardInput.value
        } else {
            let temp = allInput[3].querySelector("#error")
            if(temp) {
                temp.innerText="请输入有效身份证"
            } else {
                const spanEle = document.createElement("span");
                spanEle.innerText="请输入有效身份证"
                spanEle.id="error"
                allInput[3].appendChild(spanEle)
            }
        }
        if(values.toString().includes(",,")) {
        
        } else {
            const trEle = document.createElement("tr");
            for(i of values) {
                const tdEle = document.createElement("td");
                tdEle.innerText=i
                trEle.appendChild(tdEle)
            }
            tableEle.appendChild(trEle)  
        }
        console.log(values)
    })
})