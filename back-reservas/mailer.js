const cron = require('node-cron');
const { dbConnection } = require('./config/database');
const nodemailer = require('nodemailer');
const moment = require('moment');


const enviarCorreoRecordatorio = async () => {


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "zorrobrayan0@gmail.com",
            pass: "lrdi azvm zbkr zdyi"
        },
    });

    const q = 'SELECT fechaInicio, email FROM Reservas';
    const response = await dbConnection.query(q);


    const fechaHoy = moment();

    const fechaHoyMas24hs = moment().add(24, 'hours');

    response[0].filter((reserva) => {

        const fechaVerificada = moment(reserva.fechaInicio);

        if (fechaVerificada.isBetween(fechaHoy, fechaHoyMas24hs)) {

            const mailOptions = {
                from: 'zorrobrayan0@gmail.com',
                to: reserva.email,
                subject: 'Recordatorio de reserva',
                text: 'Recuerda que tienes una reserva programada para mañana.'
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.log(error);
                } 
            });

            console.log('Se envio un recordatorio a correo ' + reserva.email);

        }

    });

    console.log('Se enviaron todos los correos de recordatorio para reservas programadas para mañana.');
};


cron.schedule('0 21 * * *', () => {
    enviarCorreoRecordatorio();
},{
    timezone: 'America/Argentina/Buenos_Aires'
});
