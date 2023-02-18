package br.com.listit.listit.domain.entity;

public enum TypeList {
	
	ASSISTIDO("ASSISTIDOS"),
	FINALIZADO("FINALIZADOS"),
	PARA_ASSISTIR("PARA ASSISTIR"),
	FAVORITO("FAVORITOS");
	
	private String name;

	private TypeList(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
