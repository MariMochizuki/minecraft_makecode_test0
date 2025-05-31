/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon="\uf1b2"
namespace LocationEvents {
    // イベントが発生したかどうかを管理する変数
    let triggeredEvents: { [key: string]: boolean } = {}
    /**
     * @param x
     * @param y
     * @param z
     * @param radius
     */
    //% block
    export function checkPlayerLocation(radius: number, x: number, y: number, z: number) {
        let playerPos = player.position()

        // プレイヤーと目標地点の距離を計算
        const distance = Math.sqrt(
            Math.pow(playerPos.getValue(Axis.X) - x, 2) +
            Math.pow(playerPos.getValue(Axis.Y) - y, 2) +
            Math.pow(playerPos.getValue(Axis.Z) - z, 2)
        )

        return distance <= radius
    }

    //% block="宝箱イベントを開始する"
    export function startTreasureEvent() {
        // 宝箱の位置を設定
        const chestX = 10
        const chestY = 0
        const chestZ = 10

        // 宝箱を設置
        blocks.place(CHEST, pos(chestX, chestY, chestZ))

        // 宝箱の周りにヒントを表示
        player.say("宝箱を探せ！")
        player.say("ヒント: 北東方向にあるよ")

        // 定期的に位置をチェック
        loops.forever(function () {
            if (checkPlayerLocation(3, chestX, chestY, chestZ)) {
                if (!triggeredEvents["treasure"]) {
                    triggeredEvents["treasure"] = true
                    player.say("宝箱を発見！")
                    // 報酬を生成
                    blocks.place(DIAMOND_BLOCK, pos(chestX, chestY + 1, chestZ))
                }
            }
        })
    }

    //% block="迷路イベントを開始する"
    export function startMazeEvent() {
        // 迷路のゴール位置を設定
        const goalX = 20
        const goalY = 0
        const goalZ = 20

        // 迷路の壁を生成
        for (let i = 0; i < 5; i++) {
            blocks.place(STONE, pos(goalX + i, goalY, goalZ))
        }

        player.say("迷路のゴールを目指せ！")

        // 定期的に位置をチェック
        loops.forever(function () {
            if (checkPlayerLocation(2, goalX, goalY, goalZ)) {
                if (!triggeredEvents["maze"]) {
                    triggeredEvents["maze"] = true
                    player.say("迷路クリア！")
                }
            }
        })
    }

    //% block="隠しアイテムイベントを開始する"
    export function startHiddenItemEvent() {
        // 隠しアイテムの位置を設定
        const itemX = 30
        const itemY = 0
        const itemZ = 30

        // 隠しアイテムを設置
        blocks.place(EMERALD_BLOCK, pos(itemX, itemY, itemZ))

        player.say("隠されたエメラルドを探せ！")

        // 定期的に位置をチェック
        loops.forever(function () {
            if (checkPlayerLocation(2, itemX, itemY, itemZ)) {
                if (!triggeredEvents["hiddenItem"]) {
                    triggeredEvents["hiddenItem"] = true
                    player.say("エメラルドを発見！")
                    // 報酬を生成
                    blocks.place(GOLD_BLOCK, pos(itemX, itemY + 1, itemZ))
                }
            }
        })
    }

    //% block="イベントをリセットする"
    export function resetEvents() {
        triggeredEvents = {}
        player.say("すべてのイベントをリセットしました")
    }
}