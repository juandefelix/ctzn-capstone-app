json.array! @checkpoint_actions.each do |checkpoint_action|
  json.action_id checkpoint_action.action_id
  json.status checkpoint_action.status
  json.user_bill_id checkpoint_action.user_bill_id
  json.description checkpoint_action.description
  json.date checkpoint_action.date
end