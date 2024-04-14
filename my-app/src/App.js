import styles from './app.module.css';
import { useState } from 'react';

const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '=', 'C'];

export const App = () => {
	const [operand1, setOperand1] = useState('0');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [isOperator1, setIsOperator1] = useState(false);
	const [result, setResult] = useState('');

	const culc = (operator) => {
		let calcResult;
		switch (operator) {
			case '+':
				calcResult = Number(operand1) + Number(operand2);
				break;
			case '-':
				calcResult = Number(operand1) - Number(operand2);
				break;
			default:
				calcResult = 0;
		}
		return String(calcResult);
	};

	const clickNumber = (value) => {
		if (isOperator1) {
			Number(operand2) === 0 ? setOperand2(value) : setOperand2(operand2 + value);
		} else {
			Number(operand1) === 0 ? setOperand1(value) : setOperand1(operand1 + value);
		}
	};

	const clickOperator = (value) => {
		if (value === '+' || value === '-') {
			setIsOperator1(true);
			if (result !== '') {
				setOperand1(result);
				setOperator(value);
				setResult('');
				setOperand2('');
			} else if (Number(operand2) > 0 || operand2 === '0') {
				let calcResult = culc(operator);
				setOperand1(calcResult);
				setOperator(value);
				setOperand2('');
			}
			setOperator(value);
		} else if (value === '=') {
			if (operand2 === '') return;
			let calcResult = culc(operator);
			setResult(calcResult);
		} else {
			setOperand1('0');
			setOperand2('');
			setOperator('');
			setResult('');
			setIsOperator1(false);
		}
	};

	return (
		<div className={styles.app}>
			<div
				className={
					styles.output + ' ' + (result !== '' && styles['output-result'])
				}
			>
				<p>{result !== '' ? result : operand1 + operator + operand2}</p>
			</div>
			<div className={styles.buttons}>
				{NUMS.map((value) => (
					<button
						className={
							styles.btn +
							' ' +
							(isNaN(value) &&
								styles['btn-operation'] +
									' ' +
									(value === 'C' && styles['btn-clean']))
						}
						key={`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}
						onClick={() => {
							!isNaN(value) ? clickNumber(value) : clickOperator(value);
						}}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	);
};
