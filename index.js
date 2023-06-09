let {
  chatgptgg,
  simichatgg,
  apikeyTele,
  personality_ai,
} = require("./settings/config");
const { adminname } = require("./settings/admin");
const {
  getFacebook,
  getPln,
  getTiktok,
  getYoutube,
  getXsearch,
  getXvid,
  getXnsearch,
  getXnvid,
  getInstagram,
  getImgai,
} = require("./erza");
const axios = require("axios");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(apikeyTele);

bot.start((ctx) => {
  ctx.reply(
    `Halo perkenalkan saya ${ctx.botInfo.first_name}👋 \n
silahkan kirimkan pertanyaan apa saja, ganti mode dengan perintah /chatmode

ketik /menu untuk menampilkan list menu`
  );
});

bot.command("menu", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    `List command: \n
     \n/cekpln cek tagihan listrik \n/yt youtube downloader
/tt tiktok downloaer
/fb facebook downloader
`
  );
});

bot.on("sticker", async (ctx) => {
  console.log(ctx.chat, ctx.message);
});

//remove background
// bot.command('rmbg', (ctx) => ctx.reply('kirim gambar dengan caption rmbg'))

// bot.on('photo', async ctx => {
//   if (ctx.message.caption == 'rmbg') {
//     let photoid = ctx.message.photo[0].file_id;
//     let photourl = await bot.telegram.getFileLink(photoid);
//     let url = `https://api.ibeng.tech/api/maker/rmbg?url=${photourl.href}&apikey=tamvan`
//     bot.telegram.sendDocument(ctx.chat.id, url )
//   }
// })

bot.command("imgai", (ctx) => {
  if (ctx.message.text === "/imgai") {
    ctx.reply("masukan prompt");
    return;
  }
  getImgai(ctx);
});

bot.command("ig", (ctx) => {
  if (ctx.message.text === "/ig") {
    ctx.reply("masukan link ig \ncontoh: /ig instagram.com/user/1234");
    return;
  }
  getInstagram(ctx);
});

bot.command("yt", (ctx) => {
  if (ctx.message.text === "/yt") {
    ctx.reply("masukan link youtube \ncontoh: /yt youtube.com/user/1234");
    return;
  }
  getYoutube(ctx);
});

bot.command("tt", (ctx) => {
  if (ctx.message.text === "/tt") {
    ctx.reply("masukan link tiktok \ncontoh: /tt tiktok.com/user/1234");
    return;
  }
  getTiktok(ctx);
});

// bot.command("xsearch", (ctx) => {
//   if (ctx.message.text === "/xsearch") {
//     ctx.reply("masukan query");
//     return;
//   }
//   getXsearch(ctx);
// });

// bot.command("xnsearch", (ctx) => {
//   if (ctx.message.text === "/xnsearch") {
//     ctx.reply("masukan query");
//     return;
//   }
//   getXnsearch(ctx);
// });

// bot.command("xdown", (ctx) => {
//   if (ctx.message.text === "/xdown") {
//     ctx.reply("masukan link");
//     return;
//   }
//   getXvid(ctx);
// });

// bot.command("xndown", (ctx) => {
//   if (ctx.message.text === "/xndown") {
//     ctx.reply("masukan link");
//     return;
//   }
//   getXnvid(ctx);
// });

bot.command("fb", (ctx) => {
  if (ctx.message.text === "/fb") {
    ctx.reply("masukan link facebook \ncontoh: /fb facebook.com/user/1234");
    return;
  }
  getFacebook(ctx);
});

bot.command("cekpln", (ctx) => {
  if (ctx.message.text === "/cekpln") {
    ctx.reply("masukan id pelanggan \ncontoh: /cekpln 123456");
    return 0;
  }
  getPln(ctx);
});

bot.command("chatmode", (ctx) => {
  if (ctx.message.text == "/chatmode") {
    ctx.reply(
      "ketik mode openai atau simi\n \n/chatmode simi \n/chatmode openai"
    );
    return;
  }
  let pesan = ctx.message.text.split(" ").slice(1).join(" ");
  if (pesan == "openai") {
    chatgptgg = "benar";
    simichatgg = "salah";
    ctx.reply("terhubung dengan chatgpt");
    console.log("ganti ke mode openai");
  }
  if (pesan === "simi") {
    chatgptgg == "salah";
    simichatgg == "benar";
    ctx.reply("terhubung dengan simi");
    console.log("ganti ke mode simi");
  }
});

bot.on("text", (ctx) => {
  if (!ctx.message.text.startsWith("/")) {
    if (chatgptgg == "benar") {
      console.log("chatgpt berjalan");
      let pesan = `'${personality_ai}, nama saya ${ctx.chat.first_name}, kamu memiliki pacar bernama ${adminname}' 
      \npertanyaan:${ctx.message.text}?`;
      axios
        .get(
          `https://api.ibeng.tech/api/info/openai?text=${pesan}&apikey=tamvan`
        )
        .then((response) => {
          let openaires = response.data.data.data;
          ctx.reply(openaires);
        });
    } else if (simichatgg == "benar") {
      console.log("simichat berjalan");
      let pesan = ctx.message.text;
      axios
        .get(
          `https://api.ibeng.tech/api/fun/simisimi-ind2?text=${pesan}&apikey=tamvan`
        )
        .then((response) => {
          let simi = response.data.result.success;
          ctx.reply(simi);
        });
    }
  }
});

bot.launch();
