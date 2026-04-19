let expr = '';
let angleMode = 'deg';

document.querySelectorAll('input[name="angle"]').forEach(radio => {
  radio.addEventListener('change', (e) => { angleMode = e.target.value; });
});

function toRad(v) {
  return angleMode === 'deg' ? v * Math.PI / 180 : v;
}

function inp(value) {
  expr += value;
  document.getElementById('expr').textContent = expr;
  try {
    const r = evalExpr(expr);
    if (isFinite(r)) document.getElementById('result').textContent = +r.toFixed(10);
  } catch (e) {}
}

function evalExpr(str) {
  const wrapped = str
    .replace(/Math\.sin\(/g, 'Math.sin(toRad(')
    .replace(/Math\.cos\(/g, 'Math.cos(toRad(')
    .replace(/Math\.tan\(/g, 'Math.tan(toRad(');

  const finalExpr = angleMode === 'rad' ? str : wrapped;
  return Function('"use strict"; const toRad = v => ' + angleMode + ' === "deg" ? v * Math.PI / 180 : v; return (' + finalExpr + ')')();
}

function calculate() {
  try {
    const r = evalExpr(expr);
    document.getElementById('result').textContent = isFinite(r) ? +r.toFixed(10) : 'Error';
    document.getElementById('expr').textContent = expr + ' =';
    expr = String(isFinite(r) ? +r.toFixed(10) : '');
  } catch (e) {
    document.getElementById('result').textContent = 'Error';
  }
}

function clearAll() {
  expr = '';
  document.getElementById('expr').textContent = '';
  document.getElementById('result').textContent = '0';
}

function backspace() {
  expr = expr.slice(0, -1);
  document.getElementById('expr').textContent = expr;
}