/**
 * @author Júlia Dias <jdoc173@gmail.com>
 * @since 2026-03-17
 * @version 1.0.1
 * @description Esta função calcula o INSS, IRRF e salário líquido.
 * Função para processar o formulário de salário (formato brasileiro).
 */

function Salary(event) {
    event.preventDefault();

    const salaryInput = document.querySelector('input[name="salary"]').value;
    const link = document.querySelector('select').value;

    const salary = parseFloat(salaryInput.replace(',', '.'));
    
    if (isNaN(salary) || salary <= 0) {
        alert('Por favor, insira um valor salarial válido');
        return;
    }

    const resultElement = document.getElementById('resultSalary');
    resultElement.innerHTML = `
        <strong>Vínculo:</strong> ${link === '1' ? 'CLT' : link === '2' ? 'MEI/PJ' : 'Pró-labore'}<br>
        <strong>Salário:</strong> R$ ${salary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    `;

    const resultDiv = document.getElementById("result");
    const resetSalary = document.getElementById("resetSalary");
    const calcSalary = document.getElementById("calcSalary");

    calcSalary.addEventListener('click', function() {
        resultDiv.style.display = "flex";
    })

    resetSalary.addEventListener('click', function() {
        resultDiv.style.display = "none";
    })
}

