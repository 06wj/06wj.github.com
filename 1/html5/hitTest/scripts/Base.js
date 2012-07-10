var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var K_UP = 38, K_DOWN = 40, K_RIGHT = 39, K_LEFT = 37;
var K_SPACE = 32, K_TAB = 9, K_ENTER = 13, K_CTRL = 17, K_ALT = 18;
var K_0 = 48, K_1 = 49, K_2 = 50, K_3 = 51, K_4 = 52, K_5 = 53, K_6 = 54, K_7 = 55, K_8 = 56, K_9 = 57, K_A = 65, K_B = 66, K_C = 67, K_D = 68, K_E = 69, K_F = 70, K_G = 71, K_H = 72, K_I = 73, K_J = 74, K_K = 75, K_L = 76, K_M = 77, K_N = 78, K_O = 79, K_P = 80, K_Q = 81, K_R = 82, K_S = 83, K_T = 84, K_U = 85, K_V = 86, K_W = 87, K_X = 88, K_Y = 89, K_Z = 90;

function trace(obj)
{
	console.log(obj);
}
