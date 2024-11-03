const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializar o cliente do WhatsApp Web
const client = new Client();

// Exibir QR Code para autenticação
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('O cliente está pronto!');
});

// Quando uma mensagem é recebida
client.on('message', (message) => {
    const chatId = message.from;

    // Enviar lista de opções quando o usuário enviar a palavra "menu"
    if (message.body.toLowerCase().trim() === 'menu') {
        const menuMessage = `
Escolha uma opção respondendo com o número correspondente:
1. Informações de contato
2. Horários do atendimento jurídico
3. Mostrar Data e Hora
        `;
        client.sendMessage(chatId, menuMessage);
    }

    // Verificar se o usuário respondeu com um número
    const selectedOption = message.body.trim();

    if (['1', '2', '3'].includes(selectedOption)) {
        handleMenuOption(selectedOption, chatId);
    }
});

// Função que lida com as opções do menu
function handleMenuOption(option, chatId) {
    switch (option) {
        case '1':
            client.sendMessage(chatId, 'Nosso número de telefone é (81) 3222-4061. Também nos siga no Instagram @sindacspeoficial ou venha nos visitar em nossa sede: R. Gen. José Semeão, 71 - Santo Amaro, Recife - PE, 50050-120.');
            break;

        case '2':
            client.sendMessage(chatId, 'Nossos horários de consultoria jurídica gratuita para nossos filiados são:\n\n**Causas trabalhistas:**\n- Terças e quintas: 14:00 às 17:00\n\n**Previdenciário:**\n- Quartas: 14:00 às 17:00');
            break;

        case '3':
            const now = new Date();
            client.sendMessage(chatId, `Data e Hora Atual: ${now}`);
            break;

        default:
            client.sendMessage(chatId, 'Opção inválida. Por favor, responda com um número entre 1 e 3.');
            break;
    }
}

// Inicializar o cliente
client.initialize();
