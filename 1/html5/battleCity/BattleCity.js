YUI.add("BattleCity", function(Y){		
	Y.namespace("game");		
    Y.game.BattleCity = function(cfg){
        Y.game.BattleCity.superclass.constructor.apply(this,arguments);
    };
    Y.game.BattleCity.NAME = "BattleCity";
    
    Y.extend(Y.game.BattleCity, Y.game.GameBase, {
        initializer : function(cfg){
            battleCity.init(this);
        }
	});

},"0.1.0",{
    requires : ["gameBase"]
});