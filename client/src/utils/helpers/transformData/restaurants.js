const appendTranslations = (values) => {
  const { formData, index, name_translation, description_translation, language_id } = values
  formData.append(
    `restaurant[restaurant_translations_attributes][${index}][language_id]`,
    language_id,
  )
  formData.append(
    `restaurant[restaurant_translations_attributes][${index}][name_translation]`,
    name_translation?.trim() || '',
  )
  formData.append(
    `restaurant[restaurant_translations_attributes][${index}][description_translation]`,
    description_translation?.trim() || '',
  )
}

export const transformRestaurantValues = (values, id) => {
  const {
    name,
    description,
    active,
    merchant_type,
    translations,
    vat_rate,
    service_rate,
    locale,
    typical_food_image,
    dataFoodCourt,
    email,
    password,
    slug,
    menu_excluded_vat,
    qrTemplateType,
    wifiName,
    wifiPassword,
    homepageTemplate,
    capichi_delivery_following,
    deeplink_store_on_delivery,
    extraFeaturesSelected,
    currency,
    logo_home_page,
    logo_top_page,
    support_languages,
    externalPartner,
    dataStoreChain,
    video_menu_category_image,
    country,
    timezone,
  } = values
  const formData = new FormData()

  formData.append('restaurant[active]', active)
  formData.append('restaurant[merchant_type]', merchant_type.value)
  formData.append('restaurant[name]', name.trim())
  formData.append('restaurant[description]', description?.trim() || '')
  if (!id) formData.append('restaurant[slug]', slug.trim())
  formData.append('restaurant[locale]', locale.value)
  formData.append('restaurant[typical_food_image]', typical_food_image)
  formData.append('restaurant[food_court_id]', dataFoodCourt?.value || '')
  formData.append('restaurant[email]', email)
  formData.append('restaurant[password]', password)
  formData.append('restaurant[vat_rate]', vat_rate || null)
  formData.append('restaurant[service_rate]', service_rate || null)
  formData.append('restaurant[menu_excluded_vat]', menu_excluded_vat)
  formData.append('restaurant[qr_template_type]', Number(qrTemplateType.value))
  formData.append('restaurant[wifi_name]', wifiName)
  formData.append('restaurant[wifi_password]', wifiPassword)
  formData.append('restaurant[currency]', currency.value)
  formData.append('restaurant[homepage_template]', homepageTemplate.value)
  formData.append('restaurant[external_partner]', externalPartner?.value || '')
  formData.append('restaurant[capichi_delivery_following]', capichi_delivery_following)

  if (capichi_delivery_following) {
    formData.append('restaurant[deeplink_store_on_delivery]', deeplink_store_on_delivery.trim())
  } else {
    formData.append('restaurant[deeplink_store_on_delivery]', '')
  }

  formData.append('restaurant[store_chain_id]', dataStoreChain?.value || '')

  if (extraFeaturesSelected.length > 0) {
    extraFeaturesSelected.forEach((item) =>
      formData.append('restaurant[extra_feature_ids][]', item.id),
    )
  } else {
    formData.append('restaurant[extra_feature_ids][]', '')
  }

  if (logo_top_page) formData.append('restaurant[logo_top_page]', logo_top_page)
  if (logo_home_page) formData.append('restaurant[logo_home_page]', logo_home_page)
  if (video_menu_category_image)
    formData.append('restaurant[video_menu_category_image]', video_menu_category_image)

  if (support_languages.length > 0) {
    support_languages.forEach((langCode) =>
      formData.append('restaurant[support_languages][]', langCode.value),
    )
  } else {
    formData.append('restaurant[support_languages][]', '')
  }

  formData.append('restaurant[country]', country.value)
  formData.append('restaurant[timezone]', timezone.value)

  //append  translations
  if (id) {
    //Trường hợp là màn update
    translations.forEach((translation, index) => {
      const { id, language_id, name_translation, description_translation } = translation
      const nameTranslation = name_translation?.trim()
      const descriptionTranslation = description_translation?.trim()

      //trường hợp là xóa
      if (id && !nameTranslation && !descriptionTranslation) {
        formData.append(`restaurant[restaurant_translations_attributes][${index}][_destroy]`, true)
      }
      //trường hơp chỉnh sửa  translation  hoặc  thêm mới  translation
      if (nameTranslation || descriptionTranslation) {
        appendTranslations({
          formData,
          index,
          name_translation,
          description_translation,
          language_id,
        })
      }
      //Trường hợp update => gửi id cần update, nếu thêm mới thì không cần
      if (id) formData.append(`restaurant[restaurant_translations_attributes][${index}][id]`, id)
    })
  } else {
    //Trường hợp là màn create
    translations.forEach((translation, index) => {
      const { language_id, name_translation, description_translation } = translation
      const nameTranslation = name_translation?.trim()
      const descriptionTranslation = description_translation?.trim()

      if (nameTranslation || descriptionTranslation) {
        appendTranslations({
          formData,
          index,
          name_translation,
          description_translation,
          language_id,
        })
      }
    })
  }

  return formData
}
