// 製作開場動畫

// 把第一個符合class為hero的element object存到hero裡
let hero = document.querySelector(".hero");
// 把第一個符合class為silder的element object存到slider裡
let slider = document.querySelector(".slider");
// 把第一個符合section標籤中class為animation-wrappern的element object存到animation裡
let animation = document.querySelector("section.animation-wrapper");

// 我們有使用外來的套件，_TimelineMax()就是外來的，Timeline就是控制動畫時間線
const time_line = new TimelineMax();

// parameter1 是要控制的對象
// parameter2 是要duration(動畫總共要動多久)
// parameter3 是控制對象的原始狀態
// parameter4 是控制的對象的對話動畫後的狀態
// parameter4 讓動畫可以提早開始跑
time_line
  // 控制hero，動畫總共1秒，hero一開始的高為0%，結束時高要為100%
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  // 控制hero，動畫總共1.2秒，hero一開始的寬為80%，結束時高要為100%
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  // 控制slider，動畫總共1秒，slider一開始的位置為x: "-100%"意思是把slider往左推100%(瀏覽器外)，結束時 x: "0%"意思是他要再回到原來的位置
  // "-=1.2"是slider的動畫會提前1.2秒開始跑，所以會跟hero變寬的動畫同時開始跑，沒設定的話它就會等上面的動畫都跑完他才開始，所以如果設定-=2.2的話它就會跟第一個hero變高的動畫一起開始
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  // 控制animation(animation裡面就包含了hero與slider)，動畫總共0.3秒，動畫開始時透明度為1(完全不透明)，動畫結束時透明度為1(完全透明)
  // 讓animation像是消失了(原本被遮住的地方重新出現)
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

// setTimeout設置一個計時器，一旦計時器到期，該計時器就會執行一個函數或指定的代碼段。
// 因為雖然animation這個區塊變透明了，但它還是存在並蓋在其他區塊上，所以我們讓animation.style(它的CSS樣式中的).pointerEvents = "none"
// pointerEvents = "none"能讓animation這個區塊與游標不會發生任何事件，這樣就能點到被animation遮住的區塊的東西了
setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

//=======================================================================

// 取消一些事件的預設行為

// 讓整個網站的ENTER KEY都無法使用
//避免按enter整個網頁的form都被交出的情況
window.addEventListener("keypress", (e) => {
  // e就是當keypress事件發生時被製作的Event Object(KeyboardEvent)
  // 這個object有一個屬性為key，它的value就是我們按的鍵是甚麼
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

// 防止form內部的button交出表單(因為form內的button type都被預設為submit，所以按下icon是垃圾桶button也會交出表單)
// 選取DOM Tree中所有的button，再把存有所有button element object的NodeList存到allButtons這個變數內
// NodeList可以用forEach
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  // button就是每次forEach讀取的element object
  // 對button做監聽點擊事件，如果被點擊的話就用preventDefault取消事件的預設行為，例如submit的預設行為就是交出表單
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//=======================================================================

// 選擇select內的option之後要改變相對應的顏色，還有GPA也要改變

// 選取DOM Tree中所有的select，再把存有所有select element object的NodeList存到allSelects這個變數內
let allSelects = document.querySelectorAll("select");

// select選擇某個option的事件就是change，所以我們對每個select監聽change事件
// target指向發生事件的element object
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    // 如果select選取了option時，就把e.target(就是這個被選取了的select element object)傳到changeColor裡當作argument並呼叫此函式
    changeColor(e.target);
    // 改變GPA
    setGPA();
  });
});

// 這個名為target的參數會被傳入select element object
// 可以用select object中的.value這個屬性來獲得select所選的option的值
function changeColor(target) {
  // 如果選取的是A或A-的話，這個select element object的背景顏色改成lightgreen，文字顏色改成black
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "grey";
    target.style.color = "white";
  } else {
    // 如果你原本有選有value的option但之後又選了空白的option(第一個)
    // 那此select element object的背景顏色改成silver，文字顏色改成black
    target.style.backgroundColor = "silver";
    target.style.color = "black";
  }
}

// 改變credit之後，GPA也要更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});
//=======================================================================

// 計算GPA
// A = 4.0 , A- = 3.7 , B+ = 3.3 , B = 3.0 , B- = 2.7 , C+ = 2.3 , C = 2.0 , C- = 1.7 ,
// D+ = 1.3 , D = 1.0 , D- = 0.7 , F = 0
// GPA (credit X grade) / totalCredit
// 例: (1)3credit A (2)4credit C  => GPA = (3*4.0 + 4*2.0) / (3+4) = 2.8571.... = 2.86

// 取得grade分數的function
function convertor(grade) {
  // 如果grade為A的話就return4.0以此類推
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  // 對存有網頁中所有標籤為form的element object的NodeList計算長度並存到formLength中
  let formLength = document.querySelectorAll("form").length;
  // 因為我們在form需要用到的其實只有credit(input type='number')和select，所以把所有credit和selsect也選取
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll("select");
  let sum = 0; // GPA計算用分子
  let creditSum = 0; // GPA計算用分母

  // 對名為credits的NodeList中的所有input number的value作加總
  for (let i = 0; i < credits.length; i++) {
    // 用<input type="number">中的.valueAsNumber這個屬性取得我們輸入的credit值
    // 因為這個迴圈會抓所有的credit，所以即使沒填寫的也會抓取，但沒填寫的credit.valueAsNumber會為NaN，會造成後面數字加NaN得到NaN的結果
    // 所以每個迴圈都先判斷如果credits[i].valueAsNumber不是NaN的話再進行creditSum的加
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }

  // 所以每個迴圈都先判斷如果credits[i].valueAsNumber不是NaN的話再進行計算，不然會出現NaN的結果
  // convertor(selects[i].value)不用判斷是否為NaN是因為如果我們沒有選取select的option話select的值會是''(空字串)
  // 用convertor('')相當於沒有傳入引數，那convertor函式我們有設定預設就是回傳0
  for (let i = 0; i < selects.length; i++) {
    // console.log(selects[i].value);
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  // 宣告result
  let result;
  // 如果creditSum為0的話，result就為0.0，如果沒有這個判斷的話會出現NaN，因為可能會有Sum/0的情況，數字/0就會是NaN
  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    // 否則result等於sum/creditSum取到小數點第二位
    result = (sum / creditSum).toFixed(2);
  }
  // 取得ID為result-gpa的element object再用屬性.innerText取得他的文字，然後再把原本的文字改成result
  document.getElementById("result-gpa").innerText = result;
}

//=======================================================================

// 按下plus-btn後新增form

// 選取class為.plus-btn的element object並存到addButton內
let addButton = document.querySelector(".plus-btn");
// 監聽addButton的點擊事件
addButton.addEventListener("click", () => {
  // 製作一個新的form並存到newFrom中
  let newForm = document.createElement("form");
  // 製作一個新的div並存到newDiv中
  let newDiv = document.createElement("div");
  // 為newDiv新增grader這個class
  newDiv.classList.add("grader");

  // 製作div中的5個小元素
  // 科目:製作一個input並存到newInput1中=========================
  let newInput1 = document.createElement("input");
  // 為newInput1新增type這個屬性type的值為text
  newInput1.setAttribute("type", "text");
  // 為newInpu1t新增list這個屬性list的值為opt
  newInput1.setAttribute("list", "opt");
  // 為newInpu1t新增placeholder這個屬性，值為class category
  newInput1.setAttribute("placeholder", "class category");
  // 為newInput1新增class-type這個class
  newInput1.classList.add("class-type");

  // 課號=========================
  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "txet");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("class-number");

  // 學分(credit)=========================
  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.classList.add("class-credit");
  // 因為我們之前選取類別為class-credit的element object是用document.querySelectorAll，回傳是NodeList，而NodeList是靜態的，所以即使後面有任何新增他也不會有反應
  // 要對新的credit也監聽chage事件，不然新加的即使選取了也不會計算GPA
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  // 成績select=========================
  // 創建一個新的select
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  // 製作一個新的option叫做op1
  var opt1 = document.createElement("option");
  // 新增一個屬性value的值為""(空字串)
  opt1.setAttribute("value", "");
  // 創建一個文字節點內容為""，並存到textNode1中
  let textNode1 = document.createTextNode("");
  // 把textNode1這個文字節點新增到opt1中
  opt1.appendChild(textNode1);
  // 製作一個新的option叫做op2
  var opt2 = document.createElement("option");
  // 新增一個屬性value的值為"A"
  opt2.setAttribute("value", "A");
  // 創建一個文字節點內容為"A"，並存到textNode2中
  let textNode2 = document.createTextNode("A");
  // 把textNode2這個文字節點新增到opt2中
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  // 把所有做好的option新增到newSelect中
  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  // // 因為我們之前選取標籤為select的element object是用document.querySelectorAll，回傳是NodeList，而NodeList是靜態的，所以即使後面有任何新增他也不會有反應
  // 要對新的select也監聽chage事件，不然新加的即使選取了也不會計算GPA和改變顏色
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  // 製作垃圾桶button=========================
  // 創建一個新的button叫做newButton
  let newButton = document.createElement("button");
  // 為newButton新增trash-button這個class
  newButton.classList.add("trash-button");
  // 創建一個新的i叫做newItag
  let newItag = document.createElement("i");
  // 為newItag新增fas這個class
  newItag.classList.add("fas");
  // 為newItag新增fa-trash這個class
  newItag.classList.add("fa-trash");
  // 把newItag新增到newButton中
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    // 避免按下後交出表單
    e.preventDefault();
    // 新的button用和原有button不一樣的方法來達到同樣的效果
    // 讓發生click事件的button他的form的樣式套用叫做scaleDown的動畫，總共0.3秒，時間函數為ease
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.3s ease forwards";
    // 發生click事件的同時也讓這個form去監聽animationend(動畫結束)事件，如果動畫結束就刪除這個form並重新計算GPA
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  // 把所有div中要有的東西都按順序新增
  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  // newDiv要新增到newForm中
  newForm.appendChild(newDiv);
  // 選取class為all-inputs的element object，newForm要新增在個element object裡
  document.querySelector(".all-inputs").appendChild(newForm);
  // 讓newForm的style樣式中的animation為套用叫做scaleUp的動畫，動畫總共0.5秒，時間函數為ease，指定動畫未播放時（開始前、結束後或兩者）元素的樣式為停留在最後的樣子
  newForm.style.animation = "scaleUp 0.3s ease forwards";
});

// 製作垃圾桶刪除效果
let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    // e.target會指向現在發生click的element object，然後這個元素的父節點的父節點就是這個form
    // 要讓這個form新增remove這個class，然後在SCSS那邊製作.remove的樣式變更
    e.target.parentElement.parentElement.classList.add("remove");
    // 雖然form看起來不見了，但他其實沒消失，還在DOM Tree中，所以還會佔據空間
    // 在這邊不能直接remove()，因為動畫要0.3s才會完成，但是JS remove()的速度非常快，所以會變成沒有動畫的樣子
  });
});

// 把指定form在DOM Tree中刪除
allTrash.forEach((trash) => {
  // form為此trash的表單區塊
  let form = trash.parentElement.parentElement;
  // 對form做監聽transitioned事件，就是該事件在CSS 轉換完成transitionend時觸發，所以會在remove動畫結束(0.3s)才會執行下面的程式
  form.addEventListener("transitionend", (e) => {
    // transitioned結束後刪除這個form，然後重新計算GPA
    // e.target會指向現在發生transitionend事件的element object
    e.target.remove();
    setGPA();
  });
});

//=======================================================================

// 排序演算法
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");
btn1.addEventListener("click", () => {
  handleSorting("descending"); // 大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); // 小到大
});

function handleSorting(direction) {
  // div.garder裡面就涵蓋了各自from的input和selcet所以選取他
  // 把包含所有div.grader的element object的NodeList存進graders裡
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];

  for (let i = 0; i < graders.length; i++) {
    // 每個grader的children[0]就是class category，把這個input的值儲存在class_name中
    let class_name = graders[i].children[0].value;
    // 每個grader的children[1]就是class number，把這個input的值儲存在class_number中
    let class_number = graders[i].children[1].value;
    // 每個grader的children[2]就是class credit，把這個input的值儲存在class_cridet中
    let class_credit = graders[i].children[2].value;
    // 每個grader的children[3]就是class grade，把這個select的值儲存在class_grade中
    let class_grade = graders[i].children[3].value;
    // console.log(class_name, class_number, class_credit, class_grade);

    // 如果不是四個表格都為空的話就製作class_object
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      // 製作名為class_object的物件，裡面存放課程相關的資料
      let class_object = {
        // 讓class_object的class_name屬性的值為上面的class_name(444行那個變數)
        class_name,
        // 讓class_object的class_number屬性的值為上面的class_number(446行那個變數)
        class_number,
        // 讓class_object的class_credit屬性的值為上面的class_credit(448行那個變數)
        class_credit,
        // 讓class_object的class_grade屬性的值為上面的class_grade(450行那個變數)
        class_grade,
      };
      // 製作完就把這個class_object新增到objectArray中
      objectArray.push(class_object);
    }
  }

  // 取得object array後，對裡面的每個object添加新的屬性class_grade_number，這個屬性的value為class_grade這個string所代表的分數
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }
  // console.log(objectArray);

  // 取得需要的objectArray就可以對它做mergeSort
  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    // 因為objectArray經過mergeSort後是由小到大，descending是由大到小，所以這裡把陣列做反轉
    objectArray = objectArray.reverse();
  }
  // console.log(objectArray);

  // 根據objectArray的內容來更新網頁
  // 主要更改內容為class是all-inputs的element object(裡面有所有的form)
  let allInputs = document.querySelector(".all-inputs");
  // 清空allInputs裡的內容
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    // 讓allInputs加上objectArray長度個form(objectArray的長度為何就代表有幾個表單)，裡面的value就是objectArray中第i個object中那些屬性的value
    allInputs.innerHTML += `<form>
    <div class="grader">
        <input
        type="text"
        placeholder="class category"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
        /><!--
        --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
        /><!--
        --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
        /><!--
        --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
        ><!--
        --><button class="trash-button">
        <i class="fas fa-trash"></i>
        </button>
    </div>
    </form>`;
  }

  // 因為select無法直接用value更改，所以我們用JS來做更改
  // graders雖然上面選取過了，但因為querySelectorAll回傳的是NodeList，NodeList是靜態的，所以要再重新選取一次
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    // select是graders的子節點中的index=3的那個
    // 所以讓第i個graders的select的值 = objectArray第i個object的class_grade這個屬性的value
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  // 因為降序或升序後的頁面都是用innerHTML的方式這區塊內所有東西都清空再重新添加進去的
  // 所以這些東西都沒有事件監聽器，那重新填寫資料的話GPA不會重新計算select顏色也不會更改，垃圾桶按鈕還會把表單交出
  // select事件監聽
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    // 這裡要在放監聽器前就改變顏色，不然按了升序或降序後一開始就沒顏色了
    changeColor(select);
    select.addEventListener("change", (e) => {
      // 當選取select後就重新計算GPA
      setGPA();
      // 對發生change事件的那個select做changeColor函式
      changeColor(e.target);
    });
  });

  // credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  // 垃圾桶
  let allTrash = document.querySelectorAll(".trash-button");
  allTrash.forEach((trash) => {
    // 對每個垃圾筒的點擊事件做監聽
    trash.addEventListener("click", (e) => {
      // 取消預設的交出表單動作
      e.preventDefault();
      // 讓e的父節點的父節點(此垃圾桶對應的form)的樣式中的動畫為
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.3s ease forwards";
      // 監聽這個form的動畫結束的事件
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          // 刪除這個e(event object)指向的element object
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}

// merge
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  // 如果i小於a1的長度且j也小於a2的長度
  while (i < a1.length && j < a2.length) {
    // 如果a1[i]大於a2[j]，那就把a2[j]目前的值push進result哩，j+=1
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      // 如果a1[i]<a2[j]，那就把a1[i]目前的值push進result哩，i+=1
      result.push(a1[i]);
      i++;
    }
  }

  // 如果上面迴圈結束i還小於a1長度，代表a1剩下的值比a2所有的值都大，此時就把a1剩下的值直接push到result裡就好
  // 因為最一開始是把所有數都分為長度只有1個陣列，所以一開始的合併就有經過比較的過程才合併為長度是2的陣列，以此類推
  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  //  如果上面迴圈結束i還小於a1長度，代表a2剩下的值比a1所有的值都大，此時就把a2剩下的值直接push到result裡就好
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

// mergeSort
function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    // 把arr切成兩半
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    // 遞迴
    return merge(mergeSort(left), mergeSort(right));
  }
}
