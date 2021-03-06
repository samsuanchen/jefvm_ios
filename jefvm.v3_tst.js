//////////////////////
// jefvm.v2_tst.js //
//////////////////////
var tests=0, passed=0;
//////////////////////////////////////////////////////////////////////////////////////////// v0
equal('test 1',trm(vm.nameWord['r1'].xt.toString()),"function(){LED3.write(1);}");
//////////////////////////////////////////////////////////////////////////////////////////// v0
equal('test 2',trm(vm.nameWord['r0'].xt.toString()),"function(){LED3.write(0);}");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('123 . 4.56 . -10 . $41 . cr');
equal('test 3',vm.lastTob,"123 4.56 -10 65 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('"abc" . "def 123" . cr');
equal('test 4',vm.lastTob,"abc def 123 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec("'ghi' . cr");
equal('test 5',vm.lastTob,"ghi ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('5 type 2 . 5 . cr');
equal('test 6',vm.lastTob,"52 5 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('"abc def" '+"'ghi' + . 2.23 0.23 - 3 * 2 / . cr");
equal('test 7',vm.lastTob,"abc defghi 3 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('128 hex . cr decimal');
equal('test 8',vm.lastTob,"80 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('hex 100 decimal . cr');
equal('test 9',vm.lastTob,"256 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('11 binary . decimal cr');
equal('test 10',vm.lastTob,"1011 ");
//////////////////////////////////////////////////////////////////////////////////////////// v1
vm.exec('5 3 .r 10 3 .r 15 3 .r cr');
equal('test 11',vm.lastTob,"  5 10 15");
//////////////////////////////////////////////////////////////////////////////////////////// v2
vm.cArea=[ 0,vm.nameWord['doLit'],3,vm.nameWord['.r'],vm.nameWord['exit'] ],vm.addWord('t',1);
vm.exec('5 t 10 t 15 t cr');
equal('test 12',vm.lastTob,"  5 10 15");
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': x 3 .r ; 5 x 10 x 15 x cr');
equal('test 13',vm.lastTob,"  5 10 15");
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': z 9 for r@ . next ; z cr');
equal('test 14',vm.lastTob,'9 8 7 6 5 4 3 2 1 0 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': t1 8 for dup 9 r@ - * 3 .r next drop ; 3 t1 cr');
equal('test 15',vm.lastTob,'  3  6  9 12 15 18 21 24 27');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': t2 8 for 9 r@ - t1 cr next ; t2');
equal('test 16',vm.lastTob,'  9 18 27 36 45 54 63 72 81');
//////////////////////////////////////////////////////////////////////////////////////// v2
var addr=vm.cArea.length;
var compiled=[
	vm.nameWord['zBranch'],5,
	vm.nameWord['doLit'],1,
	vm.nameWord['branch'],3,
	vm.nameWord['doLit'],0,
	vm.nameWord['exit']
];
vm.cArea=vm.cArea.concat(compiled);
vm.addWord('t17',addr);
vm.exec('0 t17 . 5 t17 . cr');
equal('test 17',vm.lastTob,'0 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
addr=vm.cArea.length;
vm.exec(': t18 if 1 else 0 then ;');
equal('test 18',JSON.stringify(vm.cArea.slice(addr)),JSON.stringify(compiled));
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec('0 t18 . 5 t18 . cr');
equal('test 19',vm.lastTob,'0 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': t20 begin dup . 1- ?dup 0= if exit then again ; 9 t20 cr');
equal('test 20',vm.lastTob,'9 8 7 6 5 4 3 2 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': t21 begin dup . 1- ?dup 0= until ; 9 t21 cr');
equal('test 21',vm.lastTob,'9 8 7 6 5 4 3 2 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec(': t22 begin ?dup while dup . 1- repeat ; 9 t22 cr');
equal('test 22',vm.lastTob,'9 8 7 6 5 4 3 2 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec('10 3 mod . cr');
equal('test 23',vm.lastTob,'1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec('10 3 /mod . . cr');
equal('test 24',vm.lastTob,'3 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec('3 begin dup . 1 - ?dup 0= until cr');
equal('test 25',vm.lastTob,'3 2 1 ');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.exec('8 for 9 i - 8\n  for dup 9 i - * 3 .r \n  next cr drop\nnext');
equal('test 26',vm.lastTob,'  9 18 27 36 45 54 63 72 81');
//////////////////////////////////////////////////////////////////////////////////////// v2
vm.showTst('total tests '+tests+' passed '+passed);
///////////////////////////////////////////////////////////////////////////////////////////
vm.addWord('stop',vm.stop);
vm.addWord('go',vm.go);
vm.X=150, vm.Y=100, vm.R=30, vm.PC='black', vm.BC='rgba(255,0,0,.1)', vm.PW=.5, vm.PC='black';
vm.addWord('circle',function(){
	d3.select('svg').append('circle')
	.attr('cx',vm.X).attr('cy',vm.Y).attr('r',vm.R)
	.attr('stroke',vm.PC).attr('fill',vm.BC)
	.attr('stroke-width',vm.PW);
});
vm.H=150, vm.W=150;
vm.addWord('rect',function(){
	var s={fill:vm.BC,stroke:vm.PC,'stroke-width':vm.PW};
	d3.select('svg').append('rect')
	.attr('x',vm.X-vm.W/2).attr('y',vm.Y-vm.H/2).attr('width',vm.W).attr('height',vm.H)
	.attr('style',Object.keys(s).map(function(a){
		return a+':'+s[a];
	}).join(';'));
});