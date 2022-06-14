/**
 * 中介模式
 * */

//场景一:两个人的 泡泡堂游戏
(function (){
    class Player {
        constructor(name) {
            this.name = name;
            this.enemy = null; //敌人
        }
        win(){
            console.log(this.name+" 赢了 ")
        }
        lose(){
            console.log(this.name + " 输了 ")
        }
        die(){
            this.lose();
            this.enemy?.win();
        }
    }
//创建两个玩家对象
    const play1 = new Player("小红");
    const play2 = new Player("小明");
//设置彼此的敌人是对方
    play1.enemy = play2;
    play2.enemy = play1;
//当玩家有一个人死了,另外一个人就赢了
    play2.die();
})();



//场景二:两只队伍的 泡泡堂游戏 关系变成了网状
(function (){
    const DEAD = Symbol("DEAD");//死亡的标志
    const LIVE = Symbol("Live");//或者的标志
    class Player {
        constructor(name,teamColor) {
            this.name = name;//玩家名字
            this.partners = [];//队友列表
            this.state = LIVE;//玩家状态
            this.enemies = [];//敌人列表
            this.teamColor = teamColor;//敌人颜色
        }
        win(){ //玩家团队胜利
            console.log(this.name+" 赢了 ")
        }
        lose(){//玩家团队失败
            console.log(this.name + " 输了 ")
        }
        die(){ //玩家死亡
            let all_dead = true;
            this.state = DEAD;//设置玩家状态为死亡
            for(let item of this.partners){
                if(item.state === LIVE){
                    all_dead = false;
                    break;
                }
            }
            if(all_dead){//如果队友全部死亡
                this.lose();//通知自己游戏失败了
                //通知队友玩家失败了
                this.partners.forEach(item=>{
                    item.lose();
                })
                //通知所有敌人游戏胜利了
                this.enemies.forEach(item=>{
                    item.win();
                })
            }
        }
    }
    //定义一个数组来保存所有的玩家
    const players = [];
    //定义一个工厂来创建玩家
    const playerFactory = function (name,teamColor){
        const newPlayer = new Player(name,teamColor);
        //通知所有的玩家,有新的角色加入
        players.forEach(player=>{
            //如果是同一队的玩家,相互添加到队友列表
            if(player.teamColor === newPlayer.teamColor){
                player.partners.push(newPlayer);
                newPlayer.partners.push(player);
            }else{
                player.enemies.push(newPlayer);
                newPlayer.enemies.push(player);
            }
        })
        //把新的玩家添加到数组中
        players.push(newPlayer);
        return newPlayer;
    }
    
    //红队
    const player1 = playerFactory('A',"red"),
        player2 = playerFactory('B',"red"),
        player3 = playerFactory('C',"red"),
        player4 = playerFactory('D',"red"),
        player5 = playerFactory('E',"red");
    
    //蓝队
    const player6 = playerFactory('F',"blue"),
        player7 = playerFactory('G',"blue"),
        player8 = playerFactory('H',"blue"),
        player9 = playerFactory('i',"blue"),
        player10 = playerFactory('G',"blue");
    
    // player1.die();
    // player2.die();
    // player3.die();
    // player4.die();
    // player5.die();
})();

//场景三:中介者模式
(function (){
    const DEAD = Symbol("DEAD");//死亡的标志
    const LIVE = Symbol("Live");//或者的标志
   
    const playDirector=(function (){
        const players = {},operations = {};
        //新增一个玩家
        operations.addPlayer = function (player){
            const teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor].push(player);
        }
        //移除玩家
        operations.removePlayer = function (player){
            const teamColor = player.teamColor;
            players[teamColor] = players[teamColor] || [];
            players[teamColor] = players[teamColor].filter(item=>item !== player);
        }
        //玩家交换队伍
        operations.changeTeam = function (player,newTeamColor){
            if(player.teamColor === newTeamColor){
                throw new Error("交互队伍的颜色和自己的相同")
            }
            //从现在的删除
            operations.removePlayer(player);
            //把现在的修改了
            player.teamColor = newTeamColor;
            //添加到新的队伍
            operations.addPlayer(player);
        }
        //玩家死亡事件
        operations.playerDead=function (player){
            //拿到死亡玩家的队伍
            const teamPlayers = players[player.teamColor];
            //设置玩家状态为死亡
            player.state = DEAD;
            
            let all_dead = true;
            //判断该队伍的所有玩家是否全都死亡
            for(let item of teamPlayers){
                if(item.state === LIVE){
                    all_dead = false;
                    break;
                }
            }
            //如果全都死亡,就通知 宣布比赛结果
            if(all_dead){
                //宣布本队伍失败
                for(let item of teamPlayers){
                    item.lose();
                }
                for(let color in players){
                    if(color!== player.color){
                        //宣布另外一只队伍成功
                        for(let item of players[color]){
                            if(item.teamColor !== player.teamColor){
                                item.win();
                            }
                        }
                    }
                }
                
            }
        }
        
        function ReceiveMessage(){
            //获取第一个消息名称
            const message = Array.prototype.shift.call(arguments);
            operations[message].apply(this,arguments);
        }
        
        return {
            ReceiveMessage
        }
    })()
    
    class Player{
        constructor(name,teamColor) {
            this.name = name;
            this.teamColor = teamColor;
            this.state = LIVE;
        }
        win(){ //玩家团队胜利
            console.log(this.name+" 赢了 ")
        }
        lose(){//玩家团队失败
            console.log(this.name + " 输了 ")
        }
        die(){
            this.state = DEAD;
            //通知中介者玩家死亡
            playDirector.ReceiveMessage('playerDead',this);
        }
        remove(){
            //给中接着发送信息,移除一个玩家
            playDirector.ReceiveMessage('removePlayer',this);
        }
        changeTeam(color){
            //通知中介者 交换队伍
            playDirector.ReceiveMessage('changeTeam',this,color);
        }
    }
    
    const playerFactory = function (name,teamColor){
        const newPlayer = new Player(name,teamColor);
        //给中介者发消息,新增玩家
        playDirector.ReceiveMessage('addPlayer',newPlayer);
        return newPlayer;
    }
    
    //红队
    const player1 = playerFactory('A',"red"),
        player2 = playerFactory('B',"red"),
        player3 = playerFactory('C',"red"),
        player4 = playerFactory('D',"red"),
        player5 = playerFactory('E',"red");
    
    //蓝队
    const player6 = playerFactory('F',"blue"),
        player7 = playerFactory('G',"blue"),
        player8 = playerFactory('H',"blue"),
        player9 = playerFactory('i',"blue"),
        player10 = playerFactory('G',"blue");
    
    player1.die();
    player2.die();
    player3.die();
    player4.die();
    player5.die();
    
    
})();