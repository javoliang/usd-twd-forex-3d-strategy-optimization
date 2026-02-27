export type Language = 'en' | 'es' | 'zh-TW';

export const translations = {
    en: {
        dashboard: "Pro Dashboard",
        livePriceFeed: "Live Price Feed",
        robustOptimization: "Robust Optimization",
        rebalanceCalculator: "Rebalance Calculator",
        howItWorks: "How It Works",
        refreshData: "Refresh All Data",

        // Live Price
        usdEquals: "1 US Dollar equals",
        today: "Today",

        // Sentiment
        technicalSentiment: "Technical Sentiment",
        above: "Above",
        below: "Below",
        rsi: "RSI(14):",
        adx: "ADX(14):",
        vs200sma: "vs 200 SMA:",

        // Optimization
        optTitle: "🧊 3D Robust Strategy Optimization",
        optSubtitle: "Strategy: Dual SMA Crossover + ATR Trail Context over 5 years of daily data.",
        runningPermutations: "Running 400+ Strategy Permutations...",
        optimizationComplete: "Optimization Complete. Detected Widest Plateau (Robust Zone) at Fast",
        netReturn: "Net Return",
        strategyLandscape: "Strategy Parameter Landscape (Green/Yellow Plateaus = High Robustness)",
        fastSma: "Fast SMA",
        slowSma: "Slow SMA",
        maxDrawdown: "Max Drawdown",
        sharpeRatio: "Sharpe Ratio",
        top5: "Top 5 Robust Combinations",
        exportCsv: "Export CSV",

        // Rebalance
        rebalanceTitle: "⚖️ Bank Account Rebalance Helper",
        rebalanceSubtitle: "Easily calculate exact conversion amounts to reach your target USD/TWD exposure.",
        myUsdAmount: "My current USD amount ($)",
        myTwdAmount: "My current TWD amount (NT$)",
        targetUsdAllocation: "Target USD Allocation",
        perfectlyBalanced: "Portfolio is perfectly balanced to your target! No action needed.",
        actionRequired: "🎯 Action Required",
        swapUsdToTwd: "Swap USD to TWD",
        swapTwdToUsd: "Swap TWD to USD",
        currentAllocation: "Current Allocation",
        targetAllocation: "Target Allocation",
        clearBal: "Clear Values",
        suggestionTitle: "🤖 Quant Strategy Analysis",
        suggestionBuyUsd: "BULLISH on USD. Algorithmic momentum suggests converting your available TWD to USD.",
        suggestionBuyTwd: "BEARISH on USD. Algorithmic momentum suggests converting your available USD to TWD.",
        suggestionNeutral: "Wait for stronger trend.",
        suggestionPositioned: "Your portfolio is already fully positioned for the current trend.",

        // About
        aboutTitle: "📖 Understanding the Professional Dashboard",
        aboutQ1: "1. What is the 3D Robust Optimization?",
        aboutA1: "Unlike amateur backtesting which looks for the absolute highest historical return (peak), professional quants look for a robust plateau. A peak usually means the strategy is curve-fitted or over-optimized to past noise. If the market shifts slightly, the strategy falls off the cliff and loses money. By searching for a wide, flat region (a plateau) on the 3D surface, we ensure the parameters are statistically stable and more likely to survive out-of-sample data.",
        aboutQ2: "2. Strategy Logic",
        aboutA2_1: "Dual SMA: The core engine uses a Fast Simple Moving Average and a Slow Simple Moving Average. When Fast crosses above Slow, it indicates short-term momentum is pushing higher than long-term trend (Bullish).",
        aboutA2_2: "ATR Context: Average True Range measures volatility. We account for friction and drawdowns relative to the currency's daily volatility profile.",
        aboutQ3: "3. Sentiment Score",
        aboutA3: "A composite technical indicator running from 0 to 100:",
        aboutA3_1: "RSI (14): Identifies if the asset is overbought or oversold.",
        aboutA3_2: "ADX (14): Measures the raw strength of the current trend.",
        aboutA3_3: "200 SMA: The definitive institutional line in the sand for long-term Bull/Bear regimes.",
        disclaimer: "Disclaimer: Not financial advice. Past performance ≠ future results. For educational/personal use only.",
        dataProvided: "Data provided continuously by Yahoo Finance API without authentication."
    },
    es: {
        dashboard: "Panel Profesional",
        livePriceFeed: "Precio en Vivo",
        robustOptimization: "Optimización Robusta",
        rebalanceCalculator: "Calculadora de Rebalanceo",
        howItWorks: "Cómo Funciona",
        refreshData: "Actualizar Datos",

        // Live Price
        usdEquals: "1 Dólar Estadounidense equivale a",
        today: "Hoy",

        // Sentiment
        technicalSentiment: "Sentimiento Técnico",
        above: "Arriba",
        below: "Debajo",
        rsi: "RSI(14):",
        adx: "ADX(14):",
        vs200sma: "vs SMA 200:",

        // Optimization
        optTitle: "🧊 Optimización Robusta de Estrategia 3D",
        optSubtitle: "Estrategia: Cruce de SMA Dual + Contexto ATR sobre 5 años de datos diarios.",
        runningPermutations: "Ejecutando más de 400 permutaciones de estrategia...",
        optimizationComplete: "Optimización completa. Meseta más amplia detectada en Rápido",
        netReturn: "Retorno Neto",
        strategyLandscape: "Paisaje de Parámetros de Estrategia (Mesetas Verdes/Amarillas = Alta Robustez)",
        fastSma: "SMA Rápido",
        slowSma: "SMA Lento",
        maxDrawdown: "Caída Máxima",
        sharpeRatio: "Ratio de Sharpe",
        top5: "Top 5 Combinaciones Robustas",
        exportCsv: "Exportar CSV",

        // Rebalance
        rebalanceTitle: "⚖️ Asistente de Rebalanceo de Cuentas",
        rebalanceSubtitle: "Calcula fácilmente los montos exactos de conversión para alcanzar tu exposición deseada USD/TWD.",
        myUsdAmount: "Mi cantidad actual de USD ($)",
        myTwdAmount: "Mi cantidad actual de TWD (NT$)",
        targetUsdAllocation: "Asignación Objetivo de USD",
        perfectlyBalanced: "¡El portafolio está perfectamente balanceado a tu objetivo! No requiere acción.",
        actionRequired: "🎯 Acción Requerida",
        swapUsdToTwd: "Cambiar USD por TWD",
        swapTwdToUsd: "Cambiar TWD por USD",
        currentAllocation: "Asignación Actual",
        targetAllocation: "Asignación Objetivo",
        clearBal: "Borrar Valores",
        suggestionTitle: "🤖 Análisis de Estrategia Quant",
        suggestionBuyUsd: "ALCISTA en USD. El impulso algorítmico sugiere convertir su TWD disponible a USD.",
        suggestionBuyTwd: "BAJISTA en USD. El impulso algorítmico sugiere convertir su USD disponible a TWD.",
        suggestionNeutral: "Espera una tendencia más fuerte.",
        suggestionPositioned: "Su cartera ya está completamente posicionada para la tendencia actual.",

        // About
        aboutTitle: "📖 Entendiendo el Panel Profesional",
        aboutQ1: "1. ¿Qué es la Optimización Robusta 3D?",
        aboutA1: "A diferencia del backtesting amateur que busca el rendimiento histórico absoluto más alto (pico), los quants profesionales buscan una meseta robusta. Un pico generalmente significa que la estrategia está sobre-optimizada al ruido pasado. Si el mercado cambia ligeramente, la estrategia cae por un precipicio y pierde dinero. Al buscar una región amplia y plana (una meseta) en la superficie 3D, aseguramos que los parámetros sean estadísticamente estables y tengan más probabilidades de sobrevivir a datos fuera de muestra.",
        aboutQ2: "2. Lógica de la Estrategia",
        aboutA2_1: "SMA Dual: El motor central utiliza una Media Móvil Simple Rápida y una Lenta. Cuando la Rápida cruza por encima de la Lenta, indica que el impulso a corto plazo está empujando más alto que la tendencia a largo plazo (Alcista).",
        aboutA2_2: "Contexto ATR: El Rango Verdadero Promedio mide la volatilidad. Contabilizamos la fricción y las caídas relativas al perfil de volatilidad diaria de la moneda.",
        aboutQ3: "3. Puntuación de Sentimiento",
        aboutA3: "Un indicador técnico compuesto que va de 0 a 100:",
        aboutA3_1: "RSI (14): Identifica si el activo está sobrecomprado o sobrevendido.",
        aboutA3_2: "ADX (14): Mide la fuerza bruta de la tendencia actual.",
        aboutA3_3: "SMA 200: La línea institucional definitiva que separa regímenes a largo plazo Alcistas/Bajistas.",
        disclaimer: "Descargo de responsabilidad: No es asesoramiento financiero. Rendimiento pasado ≠ resultados futuros. Solo para uso educativo/personal.",
        dataProvided: "Datos proporcionados de forma continua por la API de Yahoo Finance sin autenticación."
    },
    'zh-TW': {
        dashboard: "專業儀表板",
        livePriceFeed: "即時報價",
        robustOptimization: "穩健策略最佳化",
        rebalanceCalculator: "銀行帳戶再平衡",
        howItWorks: "運作原理",
        refreshData: "更新所有資料",

        // Live Price
        usdEquals: "1 美元等於",
        today: "今日",

        // Sentiment
        technicalSentiment: "技術指標情緒",
        above: "之上",
        below: "之下",
        rsi: "RSI(14指標):",
        adx: "ADX(14指標):",
        vs200sma: "相對於 200 SMA:",

        // Optimization
        optTitle: "🧊 3D 穩健策略最佳化",
        optSubtitle: "策略：雙重 SMA 交叉 + ATR 追蹤停損（基於 5 年日K數據）。",
        runningPermutations: "正在執行 400+ 策略排列組合...",
        optimizationComplete: "最佳化完成。在以下參數偵測到最寬的高原區（穩健區）：快線",
        netReturn: "淨報酬",
        strategyLandscape: "策略參數地形圖（綠色/黃色高原 = 高穩健性）",
        fastSma: "快線 SMA",
        slowSma: "慢線 SMA",
        maxDrawdown: "最大回檔",
        sharpeRatio: "夏普指標",
        top5: "前 5 大穩健組合",
        exportCsv: "匯出 CSV",

        // Rebalance
        rebalanceTitle: "⚖️ 銀行帳戶再平衡助手",
        rebalanceSubtitle: "輕鬆計算精確的轉換金額，以達到您的目標 USD/TWD 曝險比例。",
        myUsdAmount: "我目前的 USD 金額 ($)",
        myTwdAmount: "我目前的 TWD 金額 (NT$)",
        targetUsdAllocation: "目標 USD 配置分配",
        perfectlyBalanced: "投資組合已達到完美平衡！無需任何操作。",
        actionRequired: "🎯 需要執行的操作",
        swapUsdToTwd: "將 USD 兌換為 TWD",
        swapTwdToUsd: "將 TWD 兌換為 USD",
        currentAllocation: "目前資產配置",
        targetAllocation: "目標資產配置",
        clearBal: "清除數值",
        suggestionTitle: "🤖 量化策略分析",
        suggestionBuyUsd: "美元看漲。演算法動能建議將您目前可用的 TWD 兌換為 USD。",
        suggestionBuyTwd: "美元看跌。演算法動能建議將您目前可用的 USD 兌換為 TWD。",
        suggestionNeutral: "等待明確趨勢。",
        suggestionPositioned: "您的投資組合已完全符合當前趨勢的配置。",

        // About
        aboutTitle: "📖 專業儀表板運作原理",
        aboutQ1: "1. 什麼是 3D 穩健最佳化？",
        aboutA1: "業餘的回測通常會尋求歷史上絕對最高的回報（尖峰），而專業的量化交易員會尋找『穩健的高原』。尖峰通常意味著策略過度擬合（Curve-fitted）了過去的雜訊。如果市場發生輕微的變動，策略就會跌落懸崖並虧損。透過在 3D 曲面上尋找寬廣、平坦的區域（高原），我們確保參數在統計上是穩定的，並且更有可能在樣本外數據中生存。",
        aboutQ2: "2. 策略邏輯",
        aboutA2_1: "雙重 SMA：核心引擎使用快速簡單移動平均線和慢速簡單移動平均線。當快線向上交叉慢線時，這表明短期動能正在推動高於長期趨勢（看漲）。",
        aboutA2_2: "ATR 情境：平均真實區間測量波動率。我們根據該貨幣對的每日波動性特徵來考慮交易摩擦與資金回檔。",
        aboutQ3: "3. 市場情緒分數",
        aboutA3: "一個介於 0 到 100 的複合技術指標：",
        aboutA3_1: "RSI (14)：識別資產是否超買或超賣。",
        aboutA3_2: "ADX (14)：測量當前趨勢的絕對強度。",
        aboutA3_3: "200 SMA：機構投資者用來定義長期牛市/熊市格局的決定性分界線。",
        disclaimer: "免責聲明：非財務建議。過去的績效 ≠ 未來的結果。僅供教育/個人參考使用。",
        dataProvided: "資料由 Yahoo Finance API 在無須授權的情況下持續提供。"
    }
};
