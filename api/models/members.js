const members = {
  memberBase: [
    {
      members_name: {
        type: String,
        required: true,
      },
    },
    {
      members_surname: {
        type: String,
        required: true,
      },
    },
    {
      members_email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    {
      members_pass: {
        type: String,
        required: true,
      },
    },
    {
      verified: {
        type: Boolean,
        default: false,
      },
    },
    { verificationToken: String },
    {
      addresses: [
        {
          name: String,
          members_gsm: String,
          members_address: String,
          cities_cityid: String,
          towns_townid: String,
          quarter: String,
          members_postcode: String,
          company: String,
          members_taxno: String,
          members_taxoffice: String,
          members_tcno: String,
        },
      ],
    },
    {
      members_date_created: {
        type: Date,
        default: Date.now,
      },
    },
  ],
};

module.exports = members;
