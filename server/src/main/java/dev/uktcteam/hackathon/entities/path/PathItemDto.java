package dev.uktcteam.hackathon.entities.path;

import dev.uktcteam.hackathon.entities.itemcoordinate.ItemCoordinateDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PathItemDto {
    private ItemCoordinateDto startItem;
    private List<ItemCoordinateDto> path;
    private ItemCoordinateDto endItem;
}
