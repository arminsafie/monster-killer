//global value
const ATTACK_VALUE = 10;
const MONSTER_ATACK_VALUE = 12;
const STRONG_ATACK_VALUE = 17;
const HEAL_VALUE = 20;

//LGO_VALUE
const MODE_ATACK = "ATTACK";
const MODE_STRONG_ATACK = "STRONG_ATACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
//PROMPT_VALUE
function getMaxlife() {
  const enterndValue = prompt("what is your chosen life?", "100");
  const parsValue = parseInt(enterndValue);
  if (isNaN(parsValue)) {
    throw { message: "invalid input enter a number " };
  } else if (parsValue <= 30) {
    throw { message: "too small value " + "try more than 30 " };
  }
  return parsValue;
}
let chosenMaxlife;
//error check
try {
  chosenMaxlife = getMaxlife();
} catch (error) {
  console.log(error);
  chosenMaxlife = 100;
  alert("you entered something wrong default value of 100 was used");
} finally {
  console.log("all done");
}

let currentMosterhealth = chosenMaxlife;
let currentPlayerhealth = chosenMaxlife;
let hasBonuseLife = true;
let battelLog = [];

adjustHealthBars(chosenMaxlife);

function writeToLog(event, value, monsterHealth, finalplayerhealth) {
  let logEntery;
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntery = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalplayerhealth: finalplayerhealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntery = {
      event: event,
      value: value,
      target: "MONSTER",
      finalMonsterHealth: monsterHealth,
      finalplayerhealth: finalplayerhealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntery = {
      event: event,
      value: value,
      target: "PLAYER",
      finalMonsterHealth: monsterHealth,
      finalplayerhealth: finalplayerhealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntery = {
      event: event,
      value: value,
      finalMonsterHealth: monsterHealth,
      finalplayerhealth: finalplayerhealth,
    };
  }
  battelLog.push(logEntery);
}

function gameHandler() {
  const mosterDamage = dealPlayerDamage(MONSTER_ATACK_VALUE);
  const inetialPlayerHealth = currentPlayerhealth;
  currentPlayerhealth -= mosterDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    mosterDamage,
    currentMosterhealth,
    currentPlayerhealth
  );
  if (currentPlayerhealth <= 0 && hasBonuseLife) {
    hasBonuseLife = false;
    removeBonusLife();
    currentPlayerhealth = inetialPlayerHealth;
    setPlayerHealth(inetialPlayerHealth);
    alert("you lose your bonus your save!");
  }

  if (currentMosterhealth <= 0 && currentPlayerhealth > 0) {
    alert("you won!!!!");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "player won!!!!",
      currentMosterhealth,
      currentPlayerhealth
    );
  } else if (currentPlayerhealth < 0 && currentMosterhealth > 0) {
    alert("you lose!!!!");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "player lose!!!!",
      currentMosterhealth,
      currentPlayerhealth
    );
  } else if (currentPlayerhealth <= 0 && currentMosterhealth <= 0) {
    alert("you have a drow");
    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "drow!!!!",
      currentMosterhealth,
      currentPlayerhealth
    );
  }
  if (currentPlayerhealth <= 0 || currentMosterhealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxdamage;
  let logEvent;
  if (mode === "attack") {
    maxdamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === "strongAttack") {
    maxdamage = STRONG_ATACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  writeToLog(logEvent, "damage", currentMosterhealth, currentPlayerhealth);
  const playerDamage = dealMonsterDamage(maxdamage);
  currentMosterhealth -= playerDamage;
  gameHandler();
}

function attackHandler() {
  attackMonster("attack");
}

function strongAttackHandler() {
  attackMonster("strongAttack");
}

function healHandler() {
  let healValue;

  if (currentPlayerhealth >= chosenMaxlife - HEAL_VALUE) {
    alert("health fully increased");
    healValue = chosenMaxlife - currentPlayerhealth;
  } else {
    healValue = HEAL_VALUE;
  }
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMosterhealth,
    currentPlayerhealth
  );
  increasePlayerHealth(healValue);
  currentPlayerhealth += healValue;
  gameHandler();
}

function reset() {
  currentMosterhealth = chosenMaxlife;
  currentPlayerhealth = chosenMaxlife;
  resetGame(chosenMaxlife);
}

function logHandler() {
  for (let i = 0; i < battelLog.length; i++) {
    console.log("---------------------------------");
  }
  console.log(battelLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logHandler);
