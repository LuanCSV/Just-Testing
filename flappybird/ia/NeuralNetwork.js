import Matrix from './Matrix.js';

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
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

}