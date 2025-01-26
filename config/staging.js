
const stagingConfig = {
  environment: 'staging',
  features: {
    public: {
      enabled: true,
      source: './public'
    },
    private: {
      enabled: true,
      adminDashboard: true,
      analytics: true
    }
  },
  database: {
    sanitize: true,
    syncFromProd: false
  }
};

module.exports = stagingConfig;
