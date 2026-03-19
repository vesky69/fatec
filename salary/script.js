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

    const inss = calculateINSS(salary);
    const irrf = calculateIRRF(salary, inss);
    const netSalary = salary - inss - irrf;

    //(Salário x Alíquota) - Dedução da faixa
    switch (link) {
        case '1': // CLT
            if (salary <= 1621.00) {
                inss = salary * 0.075;
            } else if (salary <= 2902.84) {
                inss = salary * 0.09 - 24.32;
            } else if (salary <= 4354.27) {
                inss = salary * 0.12 - 111.40; 
            } else {
                inss = 8475.55 * 0.14 - 198.49; 
            }
            break;
        case '2': // MEI/PJ
            
            break;
        case '3': // Pró-labore
            inss = 1621.00 * 0.11;
            break;
        default:
            alert('Vínculo inválido');
            return;
    }

    const resultElement = document.getElementById('resultSalary');
    resultElement.innerHTML = `
        <strong>Vínculo:</strong> ${link === '1' ? 'CLT' : link === '2' ? 'MEI/PJ' : 'Pró-labore'}<br>
        <strong>Salário:</strong> R$ ${salary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        <strong>INSS:</strong> R$ ${inss.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        <strong>IRRF:</strong> R$ ${irrf.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        <strong>Salário Líquido:</strong> R$ ${netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

