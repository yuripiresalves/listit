package br.com.listit.listit.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@RequiredArgsConstructor
@Data
@Builder
public class ImageJPG {
	private String imageURL;
	private String smallImageURL;
	private String largeImageURL;
}
