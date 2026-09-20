export type Question = {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const questions: Question[] = [
  {
    question: 'What blockchain is Forest Road Vault built on?',
    options: ['Solana', 'Ethereum L1', 'Polygon', 'Arbitrum'],
    correctIndex: 1,
    explanation:
      'Forest Road Vault is deployed on Ethereum L1 (mainnet, chain 1).',
  },
  {
    question: 'What does USDfr represent in the protocol?',
    options: [
      'A governance token',
      'A fully-backed synthetic dollar',
      'A wrapped ETH derivative',
      'An NFT collection',
    ],
    correctIndex: 1,
    explanation:
      'USDfr is a fully-backed synthetic dollar issued 1:1 against deposited USDC.',
  },
  {
    question: 'What ERC standard does the sUSDfr vault use?',
    options: ['ERC-20', 'ERC-721', 'ERC-4626', 'ERC-1155'],
    correctIndex: 2,
    explanation:
      'sUSDfr uses ERC-4626, the widely-adopted tokenized vault standard.',
  },
  {
    question: 'What is the ONLY external token the protocol integrates?',
    options: ['USDT', 'DAI', 'USDC', 'WETH'],
    correctIndex: 2,
    explanation:
      'USDC is the only external token — no AMM, no price feed, no external DeFi protocol.',
  },
  {
    question: 'How do off-chain facts enter the protocol?',
    options: [
      'Through Chainlink oracles',
      'Via manual admin input',
      'Through an m-of-n attested oracle',
      'Using API3 feeds',
    ],
    correctIndex: 2,
    explanation:
      'Off-chain facts enter only through an m-of-n attested oracle — no single party controls the data.',
  },
  {
    question: 'How many layers are in the loss cascade?',
    options: ['One', 'Two', 'Three', 'Five'],
    correctIndex: 2,
    explanation:
      'Three layers: curator first-loss → sGROVE backstop → sUSDfr principal.',
  },
  {
    question: 'What type of collateral model does the vault use?',
    options: [
      'Blind pool',
      'Identified per-asset',
      'Algorithmic',
      'Cross-collateralized',
    ],
    correctIndex: 1,
    explanation:
      'Identified per-asset — each facility is individually tracked, not pooled blindly.',
  },
  {
    question: 'What yield model does the protocol follow?',
    options: [
      'Fixed rate',
      'Variable-yield pass-through',
      'Rebasing',
      'Inflationary rewards',
    ],
    correctIndex: 1,
    explanation:
      'Variable-yield pass-through — real interest, no fixed promised rate.',
  },
  {
    question: 'Who conducted the independent external security review?',
    options: [
      'Trail of Bits',
      'OpenZeppelin',
      'Corrovera Security',
      'CertiK',
    ],
    correctIndex: 2,
    explanation:
      'Corrovera Security conducted an independent AI-assisted review.',
  },
  {
    question: 'How many internal engineering review rounds are published?',
    options: ['5', '10', '15', '20'],
    correctIndex: 2,
    explanation:
      '15 rounds published in the audit register, most recent numbered Round 16.',
  },
  {
    question: 'What happened to bootstrap admin authority after deployment?',
    options: [
      'Remains with deployer',
      'Transferred to a DAO',
      'Surrendered to a timelock',
      'Burned',
    ],
    correctIndex: 2,
    explanation:
      'Surrendered — the timelock holds all admin roles, no deployer EOA retains authority.',
  },
  {
    question: 'What sectors does the credit book cover?',
    options: [
      'Real estate and agriculture',
      'Media & entertainment, renewable energy, and digital assets',
      'Government bonds only',
      'Cross-border trade finance',
    ],
    correctIndex: 1,
    explanation:
      'Media & entertainment, renewable energy, and digital assets (related-party facility disclosed).',
  },
  {
    question: 'In the loss cascade, who absorbs losses first?',
    options: [
      'sUSDfr holders',
      'Curator first-loss capital',
      'The protocol treasury',
      'All depositors equally',
    ],
    correctIndex: 1,
    explanation:
      'Curator first-loss capital absorbs first, then sGROVE, then sUSDfr. Depositors are last.',
  },
  {
    question: 'What license is the protocol source code under?',
    options: ['MIT', 'GPL v3', 'Business Source License 1.1', 'Apache 2.0'],
    correctIndex: 2,
    explanation: 'BSL 1.1, which converts to Apache 2.0 on the Change Date.',
  },
  {
    question: 'What does the protocol explicitly NOT integrate?',
    options: [
      'Wallet connections',
      'An AMM, price feed, or external DeFi protocol',
      'ERC-4626 standard',
      'Timelock governance',
    ],
    correctIndex: 1,
    explanation:
      'No AMM, no price feed, no external DeFi protocol — by design.',
  },
]
