

exports.sendOTP = async (options) => {
  client.verify
    .services(SERVICE_SID)
    .verifications.create({
      to: `+91${options.number}`,
      channel: "sms",
    })
    .then((res) => {
      console.log(`OTP Sent to ${options.number} `);
    });

  
};
