FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}//public/uploads/message/image/3/スクリーンショット_2019-03-16_10.58.21.png")}
    user
    group
  end
end
