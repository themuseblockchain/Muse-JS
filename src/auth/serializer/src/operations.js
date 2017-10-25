
// This file is merge updated from mused's js_operation_serializer program.
/*

./js_operation_serializer |
sed 's/void/future_extensions/g'|
sed 's/muse_protocol:://g'|
sed 's/14static_variantIJNS_12fixed_stringINSt3__14pairIyyEEEEEEE/string/g'|
sed 's/muse_future_extensions/future_extensions/g'|
sed 's/muse_protocol_//g' > tmp.coffee

*/
// coffee tmp.coffee # fix errors until you see: `ChainTypes is not defined`

/*

   remove these 7 lines from tmp.coffee:

static_variant [
    pow2
    equihash_pow
] = static_variant [
    pow2
    equihash_pow
]

*/

// npm i -g decaffeinate
// decaffeinate tmp.coffee

// Merge tmp.js - See "Generated code follows" below

import types from "./types"
import SerializerImpl from "./serializer"

const {
    //id_type,
    varint32, uint8, int64, fixed_array, object_id_type, vote_id, address,
    uint16, uint32, int16, uint64,
    string, string_binary, bytes, bool, array,
    protocol_id_type,
    static_variant, map, set,
    public_key,
    time_point_sec,
    optional,
    asset,
	obj_id_lastpart,
} = types

const future_extensions = types.void
const hardfork_version_vote = types.void
const version = types.void

// Place-holder, their are dependencies on "operation" .. The final list of
// operations is not avialble until the very end of the generated code.
// See: operation.st_operations = ...
const operation = static_variant();
module.exports.operation = operation;

// For module.exports
const Serializer=function(operation_name, serilization_types_object){
    const s = new SerializerImpl(operation_name, serilization_types_object);
    return module.exports[operation_name] = s;
}

const beneficiaries = new Serializer("beneficiaries", {
  account: string,
  weight: uint16
});

const comment_payout_beneficiaries = new Serializer(0, {
  beneficiaries: set(beneficiaries)
});

// Custom-types after Generated code

// ##  Generated code follows
// -------------------------------
/*
When updating generated code (fix closing notation)
Replace:  var operation = static_variant([
with:     operation.st_operations = [

Delete (these are custom types instead):
let public_key = new Serializer( 
    "public_key",
    {key_data: bytes(33)}
);

let asset = new Serializer( 
    "asset",
    {amount: int64,
    symbol: uint64}
);

Replace: authority.prototype.account_authority_map
With: map((string), (uint16))
*/
let signed_transaction = new Serializer( 
    "signed_transaction", {
    ref_block_num: uint16,
    ref_block_prefix: uint32,
    expiration: time_point_sec,
    operations: array(operation),
    extensions: set(future_extensions),
    signatures: array(bytes(65))
}
);

let signed_block = new Serializer( 
    "signed_block", {
    previous: bytes(20),
    timestamp: time_point_sec,
    witness: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,    
        version,    
        hardfork_version_vote
    ])),
    witness_signature: bytes(65),
    transactions: array(signed_transaction)
}
);

let block_header = new Serializer( 
    "block_header", {
    previous: bytes(20),
    timestamp: time_point_sec,
    witness: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,    
        version,    
        hardfork_version_vote
    ]))
}
);

let signed_block_header = new Serializer( 
    "signed_block_header", {
    previous: bytes(20),
    timestamp: time_point_sec,
    witness: string,
    transaction_merkle_root: bytes(20),
    extensions: set(static_variant([
        future_extensions,    
        version,    
        hardfork_version_vote
    ])),
    witness_signature: bytes(65)
}
);

const vote = new Serializer( 
    "vote", {
    voter: string,
    url: string,
    weight: int16
}
);

const content_metadata_album_master = new Serializer( 
    "content_metadata_album_master", {
    part_of_album: bool,
    album_title: string,
    album_artist: array(string),
    genre_1: uint32,
    genre_2: optional(uint32),
    country_of_origin: string,
    explicit_: uint32,
    p_line: string,
    c_line: string,
    upc_or_ean: uint64,
    release_date: uint32,
    release_year: uint32,
    sales_start_date: uint32,
    album_producer: optional(string),
    album_type: optional(string),
    master_label_name: string,
    display_label_name: string
}
);

const content_metadata_track_master_track_artist = new Serializer( 
    "content_metadata_track_master_track_artist", {
    artist: string,
    aliases: optional(array(string)),
    ISNI: optional(uint64)
}
);

const content_metadata_track_master = new Serializer( 
    "content_metadata_track_master", {
    track_title: string,
    ISRC: string,
    track_artists: array(content_metadata_track_master_track_artist),
    featured_artist: optional(string),
    featured_artist_ISNI: optional(uint64),
    track_producer: optional(string),
    genre_1: uint32,
    genre_2: optional(uint32),
    p_line: string,
    track_no: uint32,
    track_volume: uint32,
    copyright: optional(string),
    track_duration: uint32,
    samples: bool
}
);

const content_metadata_publisher_publisher = new Serializer( 
    "content_metadata_publisher_publisher", {
    publisher: string,
    IPI_CAE: optional(string),
    ISNI: optional(uint64)
}
);

const content_metadata_publisher_writer = new Serializer( 
    "content_metadata_publisher_writer", {
    writer: string,
    IPI_CAE: optional(string),
    ISNI: optional(uint64),
    role: optional(uint32),
    publisher: string
}
);

const content_metadata_publisher = new Serializer( 
    "content_metadata_publisher", {
    composition_title: string,
    alternate_composition_title: optional(string),
    ISWC: optional(string),
    third_party_publishers: bool,
    publishers: array(content_metadata_publisher_publisher),
    writers: array(content_metadata_publisher_writer),
    PRO: string
}
);

const distribution = new Serializer( 
    "distribution", {
    payee: string,
    bp: uint32
}
);

const management_vote = new Serializer( 
    "management_vote", {
    voter: string,
    percentage: uint32
}
);

const content = new Serializer( 
    "content", {
    uploader: string,
    url: string,
    album_meta: content_metadata_album_master,
    track_meta: content_metadata_track_master,
    comp_meta: content_metadata_publisher,
    distributions: array(distribution),
    management: array(management_vote),
    management_threshold: uint32,
    distributions_comp: optional(array(distribution)),
    management_comp: optional(array(management_vote)),
    management_threshold_comp: optional(uint32),
    playing_reward: uint32,
    publishers_share: uint32
}
);

const content_update = new Serializer( 
    "content_update", {
    url: string,
    side: uint32,
    album_meta: optional(content_metadata_album_master),
    track_meta: optional(content_metadata_track_master),
    comp_meta: optional(content_metadata_publisher),
    new_distributions: array(distribution),
    new_management: array(management_vote),
    new_threshold: uint32,
    new_playing_reward: uint32,
    new_publishers_share: uint32
}
);

const content_approve = new Serializer( 
    "content_approve", {
    approver: string,
    url: string
}
);

const content_remove = new Serializer( 
    "content_remove",
    {url: string}
);


const transfer = new Serializer( 
    "transfer", {
    from: string,
    to: string,
    amount: asset,
    memo: string
}
);

const transfer_to_vesting = new Serializer( 
    "transfer_to_vesting", {
    from: string,
    to: string,
    amount: asset
}
);

const withdraw_vesting = new Serializer( 
    "withdraw_vesting", {
    account: string,
    vesting_shares: asset
}
);

const limit_order_create = new Serializer( 
    "limit_order_create", {
    owner: string,
    orderid: uint32,
    amount_to_sell: asset,
    min_to_receive: asset,
    fill_or_kill: bool,
    expiration: time_point_sec
}
);

const price = new Serializer( 
    "price", {
    base: asset,
    quote: asset
}
);

const limit_order_create2 = new Serializer( 
    "limit_order_create2", {
    owner: string,
    orderid: uint32,
    amount_to_sell: asset,
    exchange_rate: price,
    fill_or_kill: bool,
    expiration: time_point_sec
}
);

const limit_order_cancel = new Serializer( 
    "limit_order_cancel", {
    owner: string,
    orderid: uint32
}
);

const feed_publish = new Serializer( 
    "feed_publish", {
    publisher: string,
    exchange_rate: price
}
);

const convert = new Serializer( 
    "convert", {
    owner: string,
    requestid: uint32,
    amount: asset
}
);

const authority = new Serializer( 
    "authority", {
    weight_threshold: uint32,
    account_auths: map((string), (uint16)),
    key_auths: map((public_key), (uint16))
}
);

const account_create = new Serializer( 
    "account_create", {
    fee: asset,
    creator: string,
    new_account_name: string,
    owner: authority,
    active: authority,
    basic: authority,
    memo_key: public_key,
    json_metadata: string
}
);

const account_update = new Serializer( 
    "account_update", {
    account: string,
    owner: optional(authority),
    active: optional(authority),
    basic: optional(authority),
    memo_key: public_key,
    json_metadata: string
}
);

const chain_properties = new Serializer( 
    "chain_properties", {
    account_creation_fee: asset,
    streaming_platform_update_fee: asset,
    maximum_block_size: uint32,
    mbd_interest_rate: uint16
}
);

const witness_update = new Serializer( 
    "witness_update", {
    owner: string,
    url: string,
    block_signing_key: public_key,
    props: chain_properties,
    fee: asset
}
);

const account_witness_vote = new Serializer( 
    "account_witness_vote", {
    account: string,
    witness: string,
    approve: bool
}
);

const account_witness_proxy = new Serializer( 
    "account_witness_proxy", {
    account: string,
    proxy: string
}
);

const streaming_platform_update = new Serializer( 
    "streaming_platform_update", {
    owner: string,
    url: string,
    fee: asset
}
);

const account_streaming_platform_vote = new Serializer( 
    "account_streaming_platform_vote", {
    account: string,
    streaming_platform: string,
    approve: bool
}
);

const streaming_platform_report = new Serializer( 
    "streaming_platform_report", {
    streaming_platform: string,
    consumer: string,
    content: string,
    playlist_creator: string,
    play_time: uint64
}
);

const asset_options = new Serializer( 
    "asset_options", {
    max_supply: int64,
    market_fee_percent: uint16,
    max_market_fee: int64,
    issuer_permissions: uint16,
    flags: uint16,
    description: string,
    extensions: set(future_extensions)
}
);

const asset_create = new Serializer( 
    "asset_create", {
    issuer: string,
    symbol: string,
    precision: uint8,
    common_options: asset_options,
    extensions: set(future_extensions)
}
);

const asset_update = new Serializer( 
    "asset_update", {
    issuer: string,
    asset_to_update: protocol_id_type("asset"),
    new_issuer: optional(string),
    new_options: asset_options,
    extensions: set(future_extensions)
}
);

const asset_issue = new Serializer( 
    "asset_issue", {
    issuer: string,
    asset_to_issue: asset,
    issue_to_account: string,
    extensions: set(future_extensions)
}
);

const asset_reserve = new Serializer( 
    "asset_reserve", {
    issuer: string,
    payer: string,
    amount_to_reserve: asset,
    extensions: set(future_extensions)
}
);

const custom = new Serializer( 
    "custom", {
    required_auths: set(string),
    id: uint16,
    data: bytes()
}
);

const report_over_production = new Serializer( 
    "report_over_production", {
    reporter: string,
    first_block: signed_block_header,
    second_block: signed_block_header
}
);

const custom_json = new Serializer( 
    "custom_json", {
    required_auths: set(string),
    required_basic_auths: set(string),
    id: string,
    json: string
}
);

const set_withdraw_vesting_route = new Serializer( 
    "set_withdraw_vesting_route", {
    from_account: string,
    to_account: string,
    percent: uint16,
    auto_vest: bool
}
);

const challenge_authority = new Serializer( 
    "challenge_authority", {
    challenger: string,
    challenged: string,
    require_owner: bool
}
);

const prove_authority = new Serializer( 
    "prove_authority", {
    challenged: string,
    require_owner: bool
}
);

const request_account_recovery = new Serializer( 
    "request_account_recovery", {
    recovery_account: string,
    account_to_recover: string,
    new_owner_authority: authority,
    extensions: set(future_extensions)
}
);

const recover_account = new Serializer( 
    "recover_account", {
    account_to_recover: string,
    new_owner_authority: authority,
    recent_owner_authority: authority,
    extensions: set(future_extensions)
}
);

const change_recovery_account = new Serializer( 
    "change_recovery_account", {
    account_to_recover: string,
    new_recovery_account: string,
    extensions: set(future_extensions)
}
);

const escrow_transfer = new Serializer( 
    "escrow_transfer", {
    from: string,
    to: string,
    amount: asset,
    memo: string,
    escrow_id: uint32,
    agent: string,
    fee: asset,
    json_meta: string,
    expiration: time_point_sec
}
);

const escrow_dispute = new Serializer( 
    "escrow_dispute", {
    from: string,
    to: string,
    escrow_id: uint32,
    who: string
}
);

const escrow_release = new Serializer( 
    "escrow_release", {
    from: string,
    to: string,
    escrow_id: uint32,
    who: string,
    amount: asset
}
);

const op_wrapper = new Serializer( 
    "op_wrapper",
    {op: operation}
);

const proposal_create = new Serializer( 
    "proposal_create", {
    expiration_time: time_point_sec,
    proposed_ops: array(op_wrapper),
    review_period_seconds: optional(uint32),
    extensions: set(future_extensions)
}
);

const proposal_update = new Serializer( 
    "proposal_update", {
    proposal: protocol_id_type("proposal"),
    active_approvals_to_add: set(string),
    active_approvals_to_remove: set(string),
    owner_approvals_to_add: set(string),
    owner_approvals_to_remove: set(string),
    key_approvals_to_add: set(public_key),
    key_approvals_to_remove: set(public_key),
    extensions: set(future_extensions)
}
);

const proposal_delete = new Serializer( 
    "proposal_delete", {
    using_owner_authority: bool,
    proposal: protocol_id_type("proposal"),
    extensions: set(future_extensions)
}
);

const fill_convert_request = new Serializer( 
    "fill_convert_request", {
    owner: string,
    requestid: uint32,
    amount_in: asset,
    amount_out: asset
}
);

const playing_reward = new Serializer( 
    "playing_reward", {
    platform: string,
    url: string,
    mbd_payout: asset,
    vesting_payout: asset
}
);

const content_reward = new Serializer( 
    "content_reward", {
    payee: string,
    url: string,
    mbd_payout: asset,
    vesting_payout: asset
}
);

const curate_reward = new Serializer( 
    "curate_reward", {
    curator: string,
    url: string,
    mbd_payout: asset,
    vesting_payout: asset
}
);

const liquidity_reward = new Serializer( 
    "liquidity_reward", {
    owner: string,
    payout: asset
}
);

const interest = new Serializer( 
    "interest", {
    owner: string,
    interest: asset
}
);

const fill_vesting_withdraw = new Serializer( 
    "fill_vesting_withdraw", {
    from_account: string,
    to_account: string,
    withdrawn: asset,
    deposited: asset
}
);

const fill_order = new Serializer( 
    "fill_order", {
    current_owner: string,
    current_orderid: uint32,
    current_pays: asset,
    open_owner: string,
    open_orderid: uint32,
    open_pays: asset
}
);

const friendship = new Serializer( 
    "friendship", {
    who: string,
    whom: string
}
);

const unfriend = new Serializer( 
    "unfriend", {
    who: string,
    whom: string
}
);

const balance_claim = new Serializer( 
    "balance_claim", {
    deposit_to_account: string,
    balance_to_claim: protocol_id_type("balance"),
    balance_owner_key: public_key,
    total_claimed: asset
}
);

// BEWARE: ORDER OF OPERATIONS, REQUIRED FOR CORRECT NUMBER WHEN SERIALIZING TRANSACTIONS
// THIS IS WRONG, WE ARE NOT SUPPOSED TO EDIT THIS FILE, IT'S GENERATE BY TOOLING IN ./PROGRAMS OF MUSE-SOURCE, BUT IT'S NOT WORKING ACTUALLY
operation.st_operations = [
    vote,    
    content,    
    content_update,    
    content_approve,    
    content_remove,    
    transfer,    
    transfer_to_vesting,    
    withdraw_vesting,    
    limit_order_create,    
    limit_order_create2,    
    limit_order_cancel,    
    feed_publish,    
    convert,    
    account_create,    
    account_update,    
    witness_update,    
    account_witness_vote,    
    account_witness_proxy,    
    streaming_platform_update,    
    account_streaming_platform_vote,    
    streaming_platform_report,    
    asset_create,    
    asset_update,    
    asset_issue,    
    asset_reserve,    
    custom,    
    report_over_production,    
    custom_json,    
    set_withdraw_vesting_route,    
    challenge_authority,    
    prove_authority,    
    request_account_recovery,    
    recover_account,    
    change_recovery_account,    
    escrow_transfer,    
    escrow_dispute,    
    escrow_release,    
    proposal_create,    
    proposal_update,    
    proposal_delete,    
    fill_convert_request,    
    playing_reward,    
    content_reward,    
    curate_reward,    
    liquidity_reward,    
    interest,    
    fill_vesting_withdraw,    
    fill_order,    
    friendship,    
    unfriend,    
    balance_claim
];

let transaction = new Serializer( 
    "transaction", {
    ref_block_num: uint16,
    ref_block_prefix: uint32,
    expiration: time_point_sec,
    operations: array(operation),
    extensions: set(future_extensions)
}
);

//# -------------------------------
//#  Generated code end  S T O P
//# -------------------------------

// Custom Types (do not over-write)

const encrypted_memo = new Serializer(
    "encrypted_memo",
    {from: public_key,
    to: public_key,
    nonce: uint64,
    check: uint32,
    encrypted: string_binary}
);
/*

// Make sure all tests pass

npm test

*/
