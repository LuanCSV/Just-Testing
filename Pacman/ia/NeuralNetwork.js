import Matrix from './Matrix.js';

// Math.exp() - constante de euler > E elevado ao X
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
}

function dsigmoid(x) {
    return x * (1 - x);
}

function reLU(x) {
    return x >= 0 ? x : 0;
}

export default class NeuralNetwork {

    constructor(
        i_nodes, h_nodes, o_nodes,
        learning_rate = 0.25,
        range_weight = 1,
        range_bias = 1
    ) {
        // INPUT
        this.i_nodes = i_nodes;
        // HIDDEN
        this.h_nodes = h_nodes;
        // OUTPUT
        this.o_nodes = o_nodes;

        // BIAS PARA O INPUT HIDDEN - PESDO DO INPUT PARA O HIDDEN
        this.bias_ih = new Matrix(this.h_nodes, 1);
        this.bias_ih.randomize(range_bias);

        // BIAS PARA O OUTPUT HIDDEN - PESO DO HIDDEN PARA O OUTPUT
        this.bias_ho = new Matrix(this.o_nodes, 1);
        this.bias_ho.randomize(range_bias);

        // PESO QND TRANSITADO DA CAMADA INPUT PARA O HIDDEN
        this.weights_ih = new Matrix(this.h_nodes, this.i_nodes);
        this.weights_ih.randomize(range_weight);

        // PESO QND TRANSITADO DA CAMADA DO HIDDEN PARA O OUTPUT
        this.weights_ho = new Matrix(this.o_nodes, this.h_nodes)
        this.weights_ho.randomize(range_weight);

        //VARIAVEL DE APRENDIZADO
        this.learning_rate = learning_rate;
    }

    feedfoward(arr, actionFunction=sigmoid) {
        let input = Matrix.arrayToMatrix(arr);

        // input >> hidden
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(actionFunction);

        //  hidden >> output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(actionFunction);

        return output;
    }

    mutation(n = 0.1) {
        // this.bias_ih.mutation(n);
        // this.bias_ho.mutation(n);
        this.weights_ih.mutation(n);
        this.weights_ho.mutation(n);
    }

    predict(arr, actionFunction='sigmoid') {
        let output;
        if (actionFunction === 'sigmoid') {
            output = this.feedfoward(arr, sigmoid);
        }
        if (actionFunction === 'reLU') {
            output = this.feedfoward(arr, reLU);
        }
        output = Matrix.matrixToArray(output);
        return output;
    }

    train(arr, target) {
        // feedfoward ------ input > hidden > output ---- andando nas camadas da rede neural
        let input = Matrix.arrayToMatrix(arr);

        // input >> hidden
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        //  hidden >> output
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        //backpropagation - output > hidden > input --------- ele faz o caminho inverso
        // pq? pra corrigir os pesos e os bias, calculando a saida do output comparando com o target
        
        // backpropagation do output >> hidden
        let expected = Matrix.arrayToMatrix(target);
        let output_err = Matrix.subtract(expected, output); //taxa de erro
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_t = Matrix.transpose(hidden);
        
        let gradient = Matrix.hadamard(output_err, d_output);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);
        
        this.bias_ho = Matrix.add(this.bias_ho, gradient);
        
        let weights_ho_deltas = Matrix.multiply(gradient, hidden_t);
        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);

        // hidden >> input
        let weights_ho_t = Matrix.transpose(this.weights_ho);
        let hidden_err = Matrix.multiply(weights_ho_t, output_err);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_t = Matrix.transpose(input);

        let gradient_h = Matrix.hadamard(hidden_err, d_hidden);
        gradient_h = Matrix.escalar_multiply(gradient_h, this.learning_rate);

        this.bias_ih = Matrix.add(this.bias_ih, gradient_h);

        let weights_ih_deltas = Matrix.multiply(gradient_h, input_t);
        this.weights_ih = Matrix.add(this.weights_ih, weights_ih_deltas);
        
    }

}