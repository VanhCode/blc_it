const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIyNWRkZTkxYy1mMzUzLTQ2ODMtODdmYi05MzVlNzcxZWVhNjMiLCJzdWIiOiI4MTcwOThhOS05ODA1LTQ2YmQtOTQzZC0wODljZDAyYjBjMTgiLCJpYXQiOjE3MDQ2NDQ2NTN9.6yeE2wLDXTWCmVN1VFZ6NHLXtIIr_SH0SVfIOznzHsQ";

async function getMoney(idReference) {
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": API_KEY },
  };

  let data = await fetch(
    `https://api.gameshift.dev/users/${idReference}/assets`,
    options
  );
  data = await data.json();
  data = data.data;
  let money = data.find((item) => item.name === "tiền");
  return money.attributes[0].value;
}
async function setMoney(idReference, money) {
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": API_KEY },
  };

  let data = await fetch(
    `https://api.gameshift.dev/users/${idReference}/assets`,
    options
  );
  data = await data.json();
  data = data.data;
  data = data.find((item) => item.name === "tiền");
  let idNFT = data.id;

  const options1 = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      attributes: [{ traitType: "money", value: money.toString() }],
    }),
  };

  return fetch("https://api.gameshift.dev/assets/" + idNFT, options1)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

function getAllAccess() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
    },
  };

  return fetch("https://api.gameshift.dev/assets", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
async function getAccessByReferenceId(referenceId) {
  let allAcess = await getAllAccess();
  let accessByReferenceId = allAcess.data.filter(
    (item) => item.owner.referenceId == referenceId && item.name == "plot"
  );
  return accessByReferenceId;
}
function getAccessById(id) {
  const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": API_KEY },
  };

  return fetch("https://api.gameshift.dev/assets/" + id, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
function editPlotItem(idNFT, plot_status = "plot ready") {
  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      attributes: [{ traitType: "plot_status", value: plot_status }],
    }),
  };

  return fetch(`https://api.gameshift.dev/assets/${idNFT}`, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
function createPlotItem(referenceId) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-api-key": API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      details: {
        attributes: [
          {
            traitType: "plot_status",
            value: "plot ready",
          },
        ],
        description: "plot",
        imageUrl:
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjc7Ah4Ol_cLTqt-78GEtWfvPv3PuqYZ-8CgBHTWyyy-zUf-AiuAxJ_H7YhyOffejL5wCSW_HxCRiZO0HWPC3lrV1iSXVH7mBrbrOKuT-ExZg5q-ty6XeVDuW5VamiI3vACg0Wp3bx3skhSOiZtZdHUgHd090NKNp2gaBhAf9re-kIEuOMz0bafpK3GLTE/s1600/dat.png",
        name: "plot",
      },
      destinationUserReferenceId: referenceId,
    }),
  };

  return fetch("https://api.gameshift.dev/assets", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}
const email = localStorage.getItem("userEmail");
console.log(email);
var NumPlots = 0; // Đặt lại cho số lượng lô mà người dùng có
var Money = 0; // số tiền để bắt đầu
var PlotCost = 100; // Chi phí của một mảnh đất

var SeedCostT1 = 40; // Chi phí hạt giống
var SeedCostT2 = 80; // Chi phí hạt giống
var SeedCostT3 = 120; // Chi phí hạt giống

var counterLimitT1 = 4; // Thời gian để phát triển thành ngô \ phải chia hết cho 4
var counterLimitT2 = 8; // x số lượng giới hạn bộ đếm cho các loại cây trồng khác
var counterLimitT3 = 12; // x số lượng giới hạn bộ đếm cho các loại cây trồng khác

var ProfitT1 = 50; // Lợi nhuận cho mỗi vụ thu hoạch
var ProfitT2 = 100; // Công cụ sửa đổi lợi nhuận cho các loại cây trồng khác
var ProfitT3 = 160; // Công cụ sửa đổi lợi nhuận cho các loại cây trồng khác

var coopProfit = 150; // Lợi nhuận từ Coop đã mua

// Nhận các yếu tố DOM
var cropChooserWrapper = $("#cropChooserWrapper");
var cropChooserOptions = $("#cropChooserWrapper > .footer > .crop-type-option");
var plotWrapper = $("#plotWrapper");
var plot = $(".plotBox");
var MoneyBox = $("#moneyBox");
var MoneyBoxMessage = $("#MoneyBoxMessage");
var BottomMessageUI = $("#UIMessageWrapper");
var ConfirmWrapper = $("#ConfirmWrapper");
var ConfirmWrapperOptions = $("#ConfirmWrapper > .buttons > .button");
var tutorialFloaty = $("#tutorialFloat");
var seedSelection = ".seed-selection";

// Mua Coop
var coopBuyOption = $("#CoopBuyOption");
var coopBuyOptions = $("#CoopExpansionWrapper > .buttons > .button");
var CoopExpansionWrapper = $("#CoopExpansionWrapper");
var Coop = $("#Coop");

// lấy mã cho các sơ đồ Spaner và xóa khi hoàn thành
var spawnSavedPlot = $(".plotBoxSaved").html();
$(".plotBoxSaved").remove();
// lấy mã cho cốt truyện mới
var spawnNewPlot = $("<div />").append($(".plotBox").clone()).html();
// Các biến lưu trữ cục bộ
// số lô mua trước
// var numplotsFromStorage = localStorage.getItem ("numplots");
// if (numplotsFromStorage == null |
// // Nếu không có sơ đồ được lưu thì hãy đặt lại về biến
// numplots = numplots;
// } khác {
// // Nếu không, đặt số thành những gì đang lưu trữ
// numplots = parseInt (numplotsFromStorage);
//}
// console.log ("bạn có" + numplots + "sơ đồ đã mua");

//LƯỢNG TIỀN
// var moneyFromStorage = localStorage.getItem ("nummoney");
// if (moneyFromStorage == null |
//   //giống như trên
// tiền = tiền;
// } khác {
//   //giống như trên
// Tiền = ParseInt (MoneyFromStorage);
//}
console.log("you have $" + Money);

// Đặt công cụ
$("#moneyBox").html(Money);

//nhậnThôngTinCoop
var CoopFromStorage = localStorage.getItem("CoopPurchased");
if (CoopFromStorage == null || CoopFromStorage == "NaN") {
  //giốngNhưTrên
  // tiền = tiền;
  console.log("you don't own the coop!");
} else if (CoopFromStorage == "true") {
  //hiểnThịChuồng
  showTheCoop();
  //bắtĐầuQuầy
  runTheCoop();
  //cậpNhậtCôngCụTiền
  disableCoopPurchase();
  console.log("you own the coop!");
} else if (CoopFromStorage == "false") {
  console.log("you don't own the coop!");
}
async function main() {
  Money = parseInt(await getMoney(email));
  const PlotOfUser = await getAccessByReferenceId(email);
  console.log(PlotOfUser);
  NumPlots = PlotOfUser;
  // Đặt lại lưu trữ cục bộ
  $(document).on("click", "#resetAll", function () {
    localStorage.clear();
    console.log("All LocalStorage Items Clear");
  });
  // Kết thúc lưu trữ cục bộ

  // Đặt biến trò chơi

  // Đặt công cụ
  $("#moneyBox").html(Money);

  // Đặt HTML khi bắt đầu các yếu tố (chi phí, thời gian và lợi nhuận)
  cropChooserWrapper
    .find(".corn")
    .find(".cost")
    .html("Cost: $" + SeedCostT1);
  cropChooserWrapper
    .find(".corn")
    .find(".time")
    .html("Time: " + counterLimitT1 + "s");
  cropChooserWrapper
    .find(".corn")
    .find(".profit")
    .html("Profit: $" + ProfitT1);

  cropChooserWrapper
    .find(".blueberry")
    .find(".cost")
    .html("Cost: $" + SeedCostT2);
  cropChooserWrapper
    .find(".blueberry")
    .find(".time")
    .html("Time: " + counterLimitT2 + "s");
  cropChooserWrapper
    .find(".blueberry")
    .find(".profit")
    .html("Profit: $" + ProfitT2);

  cropChooserWrapper
    .find(".watermelon")
    .find(".cost")
    .html("Cost: $" + SeedCostT3);
  cropChooserWrapper
    .find(".watermelon")
    .find(".time")
    .html("Time: " + counterLimitT3 + "s");
  cropChooserWrapper
    .find(".watermelon")
    .find(".profit")
    .html("Profit: $" + ProfitT3);

  // Tạo lô đã lưu
  spawnSavedPlots();
  makePlotAvailable();
  // kết thúc tạo các lô đã lưu

  // Chạy công cụ
  // Tắt hướng dẫn
  $(document).on("click", ".tutorialOne", function () {
    tutorialFloaty.fadeOut();
    $(this).removeClass("tutorialOne");
  });
  // Kết thúc Tắt hướng dẫn

  $("#closeChooser").click(function () {
    hideSeedSelectionMenu();
  });

  $("#closeConfirm").click(function () {
    hideConfirmMenu();
  });

  $("#closeCoopConfirm").click(function () {
    hideCoopMenu();
  });

  var currentPlot = "";

  // Nhấp vào một cốt truyện
  $(document).on("click", ".plotBox", async function (event) {
    //console.log("Clicked trên cốt truyện ");
    if ($(this).hasClass("available")) {
      //vôDụng
      // Nếu có sẵn cốt truyện
      currentPlot = $(this);
      hideConfirmMenu();
      function HideShowConfirmMenu() {
        showConfirmMenu();
      }
      // sử dụng setTimeout () để thực thi
      // setTimeout (HideshowConfirmMenu, 100);
      showConfirmMenu();
      // convertplot ($ (this));
      // MakePlotaVailable ();
      // Nếu cốt truyện đã sẵn sàng để thu hoạch
    } else if ($(this).hasClass("ready-to-harvest")) {
      //ThuHoạch
      // Nếu cốt truyện được gieo hạt
      var cropType = checkCropType($(this));
      harvestPlot($(this), cropType);
      setMoney(email, Money);
      await editPlotItem(this.getAttribute("idplot"), "plot ready");
    } else if ($(this).hasClass("ready")) {
      //Trồng
      hideSeedSelectionMenu();
      function HideShowSelectionMenu() {
        showSeedSelectionMenu();
        playPlantSound();
      }
      // sử dụng setTimeout () để thực thi
      //ĐặtThờiGianChờ (,100);
      HideShowSelectionMenu();
      
      // thiết lập ($ (this));
      currentPlot = $(this);
    }
  });

  // hạt giống mới
  cropChooserOptions.click(async function () {
    var cropType = "";
    cropType = $(this).attr("class").split(" ").pop();
    console.log("crop type is " + cropType);
    // Thêm loại hạt giống vào cha mẹ khi gieo hạt lần đầu tiên
    currentPlot.addClass(cropType);
    // Nhận chi phí cây trồng dựa trên loại
    var cropCostLocal = checkCropCost(cropType);
    //console.log(" this crop sẽ tiêu tốn của bạn $ " + cropcostlocal);
    // thực sự gieo hạt giống
    plantSeed(currentPlot, cropType, cropCostLocal);
    await setMoney(email, Money);
  });

  // Nhấp vào có hoặc không có tùy chọn để mua lô
  ConfirmWrapperOptions.click(async function () {
    //consoleLog($(this));
    if ($(this).hasClass("yes")) {
      convertPlot(currentPlot);
      makePlotAvailable();
      hideConfirmMenu();
      plotWrapper.append(spawnNewPlot);
      await createPlotItem(email);
      await setMoney(email, Money);
    } else if ($(this).hasClass("no")) {
      hideConfirmMenu();
    } else {
    }
  });

  // Trigger Coop Mua tùy chọn
  coopBuyOption.click(function () {
    showCoopMenu();
  });

  // Mua chuồng
  // PlotWrapper.AppendChild (SpawnNewplot);
  console.log(plotWrapper);
  coopBuyOptions.click(function () {
    if ($(this).hasClass("yes")) {
      buyTheCoop();
      hideCoopMenu();
    } else if ($(this).hasClass("no")) {
      hideCoopMenu();
    } else {
    }
  });
}
main();

//functions

//ÂmThanhTròChơi
function playHarvestSound() {
  var audio = document.getElementById("harvestSound");
  audio.play();
}

function playPlantSound() {
  var audio = document.getElementById("plantSound");
  audio.play();
}

async function spawnSavedPlots() {
  var reqPlotsForSpawn = NumPlots.length; // Nhận số lô trừ 1
  if (reqPlotsForSpawn >= 1 && NumPlots.length <= 16) {
    // Nếu 1 trở lên và ít hơn 16 sau đó sinh ra các lô đã mua
    //console.log("You có đủ lô để sinh sản ");

    plot.remove();
    tutorialFloaty.hide(); // Ẩn hướng dẫn nếu người chơi đã chơi trò chơi

    for (var i = 0; i < NumPlots.length; i++) {
      let wrap = document.createElement("div");
      wrap.innerHTML = spawnSavedPlot;
      let Plot = wrap.querySelector("div");
      console.log(Plot);
      Plot.setAttribute("idPlot", NumPlots[i].id);
      let access = await getAccessById(NumPlots[i].id);
      let classAccess = "plotBox " + access.attributes[0].value;
      Plot.className = classAccess;
      plotWrapper.append(Plot);
      // Thêm các lô mà người dùng sở hữu
      //console.log("1 cốt truyện được thêm vào ");
    }
  } else {
    //console.log("Nothing đã được sinh ra ");
  }
  plotWrapper.append(spawnNewPlot);
}

function checkCropType(plotInfo) {
  var cropType = "";
  if (plotInfo.hasClass("corn")) {
    return "corn";
  } else if (plotInfo.hasClass("blueberry")) {
    return "blueberry";
  } else if (plotInfo.hasClass("watermelon")) {
    return "watermelon";
  } else {
    return "none";
  }
}

function checkCropCost(plotType) {
  if (plotType == "corn") {
    return SeedCostT1;
    //console.log("Crop là loại ngô và chi phí là: " + seedcost);
  } else if (plotType == "blueberry") {
    return SeedCostT2;
    //console.log("Crop là loại dâu tây và chi phí là: " + SeedCost * SeedCostModifier);
  } else if (plotType == "watermelon") {
    return SeedCostT3;
    //console.log("Crop là loại việt quất và chi phí là: " + SeedCost * SeedCostModifier);
  } else {
    //không làm gì cả
  }
}

function checkCropProfit(plotType) {
  if (plotType == "corn") {
    return ProfitT1;
  } else if (plotType == "blueberry") {
    return ProfitT2;
  } else if (plotType == "watermelon") {
    return ProfitT3;
  } else {
    //không làm gì cả
  }
}

function checkCropTimerLimit(plotType) {
  if (plotType == "corn") {
    return counterLimitT1;
    //console.log("Plot loại là ngô ");
  } else if (plotType == "blueberry") {
    return counterLimitT2;
    //console.log("Plot loại là quả việt quất ");
  } else if (plotType == "watermelon") {
    return counterLimitT3;
    //console.log("Plot loại là dưa hấu ");
  } else {
    //không làm gì cả
  }
}

// Chức năng trồng hạt giống sau khi nhận và thiết lập các biến
function plantSeed(plotInfo, plotType, cropCost) {
  console.log("You have: $" + Money);
  if (Money >= cropCost) {
    var cropType = plotType;
    plotInfo.removeClass("plot");
    plotInfo.removeClass("ready");
    plotInfo.addClass("seed-" + cropType);

    console.log("This crop cost you: $" + cropCost);
    Money = Money - cropCost;
    console.log("You now have: $" + Money + "left");
    MoneyBox.html(Money);
    startPlotTimer(plotInfo, cropType);
    hideSeedSelectionMenu();
  } else {
    console.log("You DO NOT have enough money!");
    BottomMessageUI.html("You DO NOT have enough money!");
    animateBottomUITooltip();
  }
} // kết thúc hạt giống cây trồng

// cung cấp một lô có sẵn để sử dụng nếu điều kiện đáp ứng
function makePlotAvailable() {
  var NumPlotsAvail = $("#plotWrapper > .available").length;
  var NumPlotCurrent = $("#plotWrapper > .plotBox").length;
  //console.log(NUMPLOTSAVAIL);
  if (Money >= PlotCost && NumPlotsAvail == 0 && NumPlotCurrent <= 15) {
    //console.log(spawnNewplot);
    console.log("a new plot has been added");
  } else {
    //Không làm gì cả
    console.log("needs more money to spawn new plot");
  }
}

// chuyển đổi cốt truyện từ có sẵn sang có thể thu hoạch được
function convertPlot(plotInfo) {
  if (Money >= PlotCost) {
    plotInfo.removeClass("available").addClass("plot ready");
    Money = Money - PlotCost;
    SaveMoneyAmmount(Money);
    MoneyBox.html(Money);
    MoneyBoxMessage.html("-$" + PlotCost);
    console.log("> you have used $" + PlotCost);
    console.log(">> you have purchased a plot");
    SaveNumPlots();
    animateMoneyTooltip();
    plotInfo.attr("title", "Ready for Planting!");
  } else {
    console.log("You DO NOT have enough money!");
    BottomMessageUI.html("You DO NOT have enough money!");
    animateBottomUITooltip();
  }
}

// Lô thu hoạch
function harvestPlot(plotInfo, plotType) {
  playHarvestSound();
  console.log("Prior to harvest you have $" + Money);
  var localProfit = 0;

  localProfit = checkCropProfit(plotType);

  //console.log(" Điều này có một vụ mùa đã trồng! ");
  plotInfo.removeClass();
  plotInfo.addClass("plotBox plot ready");
  // animateBottomiTooltip ();
  //LÀM RA TIỀN
  Money = Money + localProfit;
  SaveMoneyAmmount(Money);
  MoneyBox.html(Money);
  console.log("> you have made $" + localProfit);
  MoneyBoxMessage.html("+ $" + localProfit);
  console.log("after harvest you now have: $" + Money);
  animateMoneyTooltip();
  makePlotAvailable();
  plotInfo.attr("title", "Ready for Planting!");
  //console.log("New cốt truyện đã sinh ra ");
} // kết thúc âm mưu thu hoạch

// Hẹn giờ âm mưu
function startPlotTimer(plotInfo, plotType) {
  var counter = 0;
  var counterFraction = 4;
  var plotTypeFinal = plotType;
  var localCounterLimit = 0;

  localCounterLimit = checkCropTimerLimit(plotType);

  var interval = setInterval(async function () {
    plotInfo.removeClass("plot");
    plotInfo.attr(
      "title",
      Math.abs(counter - localCounterLimit) + " Seconds until ready."
    );
    counter++;
    var counterFractioned = localCounterLimit / counterFraction;
    //console.log(Countractioned);
    //console.log(Count);
    if (counter == counterFractioned * 1) {
      plotInfo
        .removeClass("seed-" + plotTypeFinal)
        .addClass("seedling-" + plotTypeFinal);
    } else if (counter == counterFractioned * 2) {
      plotInfo
        .removeClass("seedling-" + plotTypeFinal)
        .addClass("adolescent-" + plotTypeFinal);
    } else if (counter == counterFractioned * 3) {
      plotInfo
        .removeClass("adolescent-" + plotTypeFinal)
        .addClass("mature-" + plotTypeFinal);
    } else if (counter == localCounterLimit) {
      plotInfo
        .removeClass("mature-" + plotTypeFinal)
        .addClass("ready-to-harvest adult-" + plotTypeFinal);
      await editPlotItem(
        plotInfo.attr("idplot"),
        plotTypeFinal + " ready-to-harvest adult-" + plotTypeFinal
      );
      //Bottommessageui.html(" đã sẵn sàng để thu hoạch! ");
      plotInfo.attr("title", "Ready to Harvest!");
      clearInterval(interval);
    } else {
      //không làm gì cả
    }
  }, 1000);
} // Hẹn giờ âm mưu

// làm động tiền bạc
function animateMoneyTooltip() {
  MoneyBoxMessage.animate(
    {
      opacity: "1",
      bottom: "-20px",
    },
    500,
    function () {
      MoneyBoxMessage.animate({
        opacity: "0",
        bottom: "-30px",
      });
    }
  );
}

// làm nổi bật đầu tin nhắn dưới cùng
function animateBottomUITooltip() {
  BottomMessageUI.animate(
    {
      opacity: "1",
    },
    1000,
    "linear",
    function () {
      BottomMessageUI.animate({
        opacity: "0",
      });
    }
  );
}

function showSeedSelectionMenu() {
  cropChooserWrapper.addClass("show");
  cropChooserWrapper.find(".crop-type-option").addClass("hide");
  if (Money >= SeedCostT3) {
    cropChooserWrapper.find(".corn").removeClass("hide");
    cropChooserWrapper.find(".blueberry").removeClass("hide");
    cropChooserWrapper.find(".watermelon").removeClass("hide");
  } else if (Money >= SeedCostT2) {
    cropChooserWrapper.find(".corn").removeClass("hide");
    cropChooserWrapper.find(".blueberry").removeClass("hide");
    //cropchooserwrapper.find(".watermelon").removeclass("hide ");
  } else if (Money >= SeedCostT1) {
    cropChooserWrapper.find(".corn").removeClass("hide");
  }
}

function hideSeedSelectionMenu() {
  cropChooserWrapper.removeClass("show");
}

function showConfirmMenu() {
  ConfirmWrapper.addClass("show");
}

function hideConfirmMenu() {
  ConfirmWrapper.removeClass("show");
}

// Lưu các lô khi chúng được mua
function SaveNumPlots() {
  NumPlots = NumPlots + 1;
  localStorage.setItem("NumPlots", NumPlots);
  //console.log("You có " + numplots +" sơ đồ đã mua ");
}

// Tiết kiệm tiền khi nó được mua
function SaveMoneyAmmount(moneyAmount) {
  localStorage.setItem("NumMoney", moneyAmount);
  //console.log("You có $ " + moneyamount);
}

// Hiển thị tùy chọn mua chuồng
function showCoopMenu() {
  CoopExpansionWrapper.addClass("show");
}
// Ẩn Coop Mua tùy chọn
function hideCoopMenu() {
  CoopExpansionWrapper.removeClass("show");
}

function buyTheCoop() {
  if (Money >= 10) {
    // Hiển thị chuồng
    showTheCoop();
    // Bắt đầu quầy
    runTheCoop();
    // Cập nhật công cụ tiền
    Money = Money - 10;
    SaveMoneyAmmount(Money);
    MoneyBox.html(Money);
    MoneyBoxMessage.html("- $" + 10);
    console.log("You Have Used: $10,000");
    console.log("You now own the Coop!");
    animateMoneyTooltip();
    // Lưu boolean lưu trữ cục bộộ
    localStorage.setItem("CoopPurchased", true);
    disableCoopPurchase();
  } else {
    console.log("You DO NOT have enough money!");
    BottomMessageUI.html("You DO NOT have enough money!");
    animateBottomUITooltip();
  }
}

function runTheCoop() {
  setInterval(function () {
    Money = Money + coopProfit;
    MoneyBox.html(Money);
    MoneyBoxMessage.html("+ $" + coopProfit);
    console.log("You Have Made: " + coopProfit + " from the Coop");
    animateMoneyTooltip();
  }, 60 * 1000); //60 *1000Milsec
}

function showTheCoop() {
  Coop.addClass("show");
}

function disableCoopPurchase() {
  coopBuyOption.hide();
}
