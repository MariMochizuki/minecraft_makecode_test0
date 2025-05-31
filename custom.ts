//% weight=100 color=#0fbc11 icon="\uf1b2"
namespace MysteryGame {
    // プレイヤーの状態を管理する変数
    let playerScore = 0
    let isGameStarted = false
    let currentRiddle = 0
    let riddleAnswers = ["DIAMOND", "EMERALD", "GOLD", "REDSTONE", "LAPIS"]

    //% block="謎解きゲームを開始する"
    export function startMysteryGame() {
        isGameStarted = true
        playerScore = 0
        currentRiddle = 0
        player.say("謎解きゲームを開始します！")
        showNextRiddle()
    }

    //% block="次の謎を表示する"
    export function showNextRiddle() {
        if (!isGameStarted) {
            player.say("ゲームを開始してください！")
            return
        }

        switch (currentRiddle) {
            case 0:
                player.say("第1問: 最も硬い鉱石は？")
                break
            case 1:
                player.say("第2問: 緑色の宝石は？")
                break
            case 2:
                player.say("第3問: 王冠の材料になる鉱石は？")
                break
            case 3:
                player.say("第4問: 赤い粉の鉱石は？")
                break
            case 4:
                player.say("第5問: 青い染料の材料になる鉱石は？")
                break
        }
    }

    //% block="答えをチェックする %answer"
    export function checkAnswer(answer: string) {
        if (!isGameStarted) {
            player.say("ゲームを開始してください！")
            return
        }

        if (answer.toUpperCase() == riddleAnswers[currentRiddle]) {
            playerScore += 1
            player.say("正解！")
            currentRiddle += 1

            if (currentRiddle < riddleAnswers.length) {
                showNextRiddle()
            } else {
                endGame()
            }
        } else {
            player.say("不正解です。もう一度挑戦してください！")
        }
    }

    //% block="ゲームを終了する"
    export function endGame() {
        isGameStarted = false
        player.say("ゲーム終了！ スコア: " + playerScore + "/" + riddleAnswers.length)

        // スコアに応じて報酬を生成
        if (playerScore == riddleAnswers.length) {
            // 全問正解の場合、ダイヤモンドブロックを生成
            blocks.place(DIAMOND_BLOCK, pos(0, 0, 0))
        } else if (playerScore >= 3) {
            // 3問以上正解の場合、金ブロックを生成
            blocks.place(GOLD_BLOCK, pos(0, 0, 0))
        }
    }

    //% block="ヒントを表示する"
    export function showHint() {
        if (!isGameStarted) {
            player.say("ゲームを開始してください！")
            return
        }

        switch (currentRiddle) {
            case 0:
                player.say("ヒント: 採掘にダイヤモンドのツルハシが必要です")
                break
            case 1:
                player.say("ヒント: エメラルドの色を思い出してください")
                break
            case 2:
                player.say("ヒント: 王冠は金色です")
                break
            case 3:
                player.say("ヒント: レッドストーンの色を思い出してください")
                break
            case 4:
                player.say("ヒント: ラピスラズリの色を思い出してください")
                break
        }
    }

    //% block="現在のスコアを表示する"
    export function showScore() {
        if (!isGameStarted) {
            player.say("ゲームを開始してください！")
            return
        }
        player.say("現在のスコア: " + playerScore + "/" + riddleAnswers.length)
    }
}