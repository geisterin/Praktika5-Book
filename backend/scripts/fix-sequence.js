const { sequelize } = require('../models');

(async () => {
  try {
    // Books
    const [[{ max: maxBookId }]] = await sequelize.query(`SELECT MAX(id) FROM "Books"`);
    const nextBookId = (parseInt(maxBookId) || 0) + 1;
    await sequelize.query(`ALTER SEQUENCE "Books_id_seq" RESTART WITH ${nextBookId}`);
    console.log(`✅ Books_id_seq сброшен. Следующий id: ${nextBookId}`);

    // Authors
    const [[{ max: maxAuthorId }]] = await sequelize.query(`SELECT MAX(id) FROM "Authors"`);
    const nextAuthorId = (parseInt(maxAuthorId) || 0) + 1;
    await sequelize.query(`ALTER SEQUENCE "Authors_id_seq" RESTART WITH ${nextAuthorId}`);
    console.log(`✅ Authors_id_seq сброшен. Следующий id: ${nextAuthorId}`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка при сбросе sequence:', err);
    process.exit(1);
  }
})();
