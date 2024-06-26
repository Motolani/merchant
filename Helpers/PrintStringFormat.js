import Config from "./Config";

export default function PrintStringFormat(data, logo) {
  if (Config.isShagoPOs) {
    return shago(data, logo);
  } else {
    return GA(data, logo);
  }
}

const GA = (data, logo) => {
  let header = [
    {
      isMultiline: true,
      header: {
        text: "SHAGO PAYMENTS",
        align: "center",
        size: "large",
        isBold: true,
      },
      body: {
        text: "(The Market Place)",
        align: "center",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "Transaction  Summary",
        align: "center",
        size: "normal",
        isBold: true,
      },
      body: {
        text: "--------------------------------",
      },
    },
    {
      isMultiline: false,
      header: {
        text: "ITEM",
        align: "left",
      },
      body: {
        text: "VALUE",
        align: "right",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "--------------------------------",
      },
      body: {
        text: "",
      },
    },
  ];
  let footer = [
    {
      isMultiline: true,
      header: {
        text: "(Customer & Agent Receipt)",
        align: "center",
      },
      body: {
        text: "--------------------------------",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "Transaction  Summary",
        align: "center",
        size: "normal",
        isBold: true,
      },
      body: {
        text: "--------------------------------",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "Thank you, visit again.",
        align: "center",
      },
      body: {
        text: "CUSTOMER CARE",
        align: "center",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "+2349090000448, +2349090000844, +2348092399996",
      },
      body: {
        text: "customercare@shagopayments.com",
      },
    },
  ];
  let arr = header.concat(data);
  let result = arr.concat(footer);

  let string = {
    Receipt: [
      {
        Bitmap: logo ?? "/sdcard/GA/res/printlogo.bmp",
        letterSpacing: 5,
        String: result,
      },
    ],
  };
  return JSON.stringify(string);
};

const shago = (data, logo) => {
  let header = [
    {
      isMultiline: true,
      header: {
        text: "SHAGO PAYMENTS",
        align: "center",
        size: "large",
        isBold: true,
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: true,
      header: {
        text: "Powered by Alerzo",
        align: "center",
        size: "large",
        isBold: true,
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: true,
      header: {
        text: "Transaction  Summary",
        align: "center",
        size: "normal",
        isBold: true,
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "--------------------------------",
        align: "left",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: false,
      header: {
        text: "ITEM",
        align: "left",
      },
      body: {
        text: " VALUE",
        align: "right",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "--------------------------------",
        align: "left",
      },
      body: {
        text: "",
      },
    },
  ];

  let footer = [
    {
      isMultiline: true,
      header: {
        text: "(Customer & Agent Receipt)",
        align: "center",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "--------------------------------",
        align: "center",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "Transaction  Summary",
        align: "center",
        size: "normal",
        isBold: true,
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "--------------------------------",
        align: "center",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "Thank you, visit again.",
        align: "center",
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: true,
      header: {
        text: "CUSTOMER CARE",
        align: "center",
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: false,
      header: {
        text: "+2349090000448, +2349090000844, +2348092399996",
        align: "left",
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: false,
      header: {
        text: "customercare@shagopayments.com",

        align: "left",
      },
      body: {
        text: "",
      },
    },

    {
      isMultiline: true,
      header: {
        text: "",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "",
      },
      body: {
        text: "",
      },
    },
    {
      isMultiline: true,
      header: {
        text: "",
      },
      body: {
        text: "",
      },
    },
  ];
  let arr = header.concat(data);
  let result = arr.concat(footer);

  let string = {
    imagePath: logo,
    letterSpacing: 0,
    fields: result,
  };
  return JSON.stringify(string);
};
